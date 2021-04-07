import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { getWords } from '../../../../../api/words';
import { GameHeader } from '../components/GameHeader';
import { PaperHeader } from '../components/PaperHeader';
import { GameButtons } from '../components/GameButtons';
import { Timer } from '../components/Timer';
import { PAGE_NUMBER } from '../../../../../constants/pageNumber';
import { IWord } from '../../types';
import useSound from 'use-sound';
import styled from 'styled-components';
const wrongAnswerSound = require('../../../../../assets/sounds/wrongAnswer.mp3');
const rightAnswerSound = require('../../../../../assets/sounds/rightAnswer.mp3');

const StyledGrid = styled(Grid)`
  position: relative;
  height: 100vh;
`;

interface StyledProps {
  answer: string;
  border: string;
}

const StyledPaper = styled(Paper)`
  position: relative;
  width: 400px;
  height: 400px;
  &.MuiPaper-root {
    background-color: #ffd6cf;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &.MuiPaper-elevation1 {
    box-shadow: ${(p: StyledProps) => {
      const border = p.border === 'true';
      const isAnswerRight = p.answer === 'true';
      if (border && isAnswerRight) {
        return 'inset 0 0 0 5px #11a911';
      }
      if (border && !isAnswerRight) {
        return 'inset 0 0 0 5px #f13434';
      }
      return 'none';
      // p.isBorderShow
      //   ? p.isAnswerRight
      //     ? 'inset 0 0 0 5px #11a911'
      //     : 'inset 0 0 0 5px #f13434'
      //   : 'none';
    }};
  }
`;

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  level: number;
  setWrongAnswers: (
    wrongAnswers: (prev: (IWord | null)[]) => (IWord | null)[]
  ) => void;
  setRightAnswers: (
    rightAnswers: (prev: (IWord | null)[]) => (IWord | null)[]
  ) => void;
  score: number;
  setScore: (score: (value: number) => number) => void;
}

export const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  level,
  setWrongAnswers,
  setRightAnswers,
  score,
  setScore,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [translateRandomWord, setTranslateRandomWord] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isWrongTranslationAdded, setIsWrongTranslationAdded] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(true);
  const [isBorderShow, setIsBorderShow] = useState(false);
  const [isСolorHeaderShow, setIsColorHeaderShow] = useState(false);
  const [isHeaderYellow, setIsHeaderYellow] = useState(false);
  const [
    numberConsecutiveRightAnswers,
    setNumberConsecutiveRightAnswers,
  ] = useState(0);

  const [playWrongAnswer] = useSound(wrongAnswerSound.default, {
    volume: 0.45,
  });
  const [playRightAnswer] = useSound(rightAnswerSound.default, {
    volume: 0.35,
  });

  const addWrongTranslation = (res: IWord[]) => {
    const wordsWithWrongTranslate = res.map((word: IWord, index: number) => {
      if (index !== 0) {
        return {
          ...word,
          wordTranslate: [word.wordTranslate, res[index - 1].wordTranslate],
        };
      } else {
        return {
          ...word,
          wordTranslate: [
            word.wordTranslate,
            res[res.length - 1].wordTranslate,
          ],
        };
      }
    });
    setWords((prev: any) => {
      return [...prev, ...wordsWithWrongTranslate];
    });
    setIsWrongTranslationAdded(true);
  };

  useEffect(() => {
    getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
      addWrongTranslation(res);
    });
  }, [level]);

  useEffect(() => {
    if (words.length === 5) {
      getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
        addWrongTranslation(res);
      });
    }
  }, [words, level]);

  useEffect(() => {
    if (isWrongTranslationAdded) {
      getRandomWord();
    }
    // eslint-disable-next-line
  }, [isWrongTranslationAdded]);

  const getRandomWord = () => {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    while (playedWords.includes(randomWord.word)) {
      randomWord = words[Math.floor(Math.random() * words.length)];
    }
    setWords((prev: IWord[]) =>
      prev.filter((word: IWord) => word.id !== randomWord.id)
    );
    setPlayedWords((prev: string[]) => [...prev, randomWord.word]);
    setRandomWord(randomWord);
    setTranslateRandomWord(randomWord.wordTranslate[Math.round(Math.random())]);
  };

  const checkRightButton = () => {
    if (randomWord?.wordTranslate[0] === translateRandomWord) {
      setRightAnswers((prev: (IWord | null)[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
      }
      setIsAnswerRight(true);
      updateScore({ isRight: true });
    } else {
      setWrongAnswers((prev: (IWord | null)[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playWrongAnswer();
      }
      setIsAnswerRight(false);
      updateScore({ isRight: false });
    }
    setIsBorderShow(true);
    setTimeout(() => {
      setIsBorderShow(false);
    }, 1000);
  };

  const checkWrongButton = () => {
    if (randomWord?.wordTranslate[0] !== translateRandomWord) {
      setRightAnswers((prev: (IWord | null)[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
      }
      setIsAnswerRight(true);
      updateScore({ isRight: true });
    } else {
      setWrongAnswers((prev: (IWord | null)[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playWrongAnswer();
      }
      setIsAnswerRight(false);
      updateScore({ isRight: false });
    }
    setIsBorderShow(true);
    setTimeout(() => {
      setIsBorderShow(false);
    }, 1000);
  };

  const updateScore = ({ isRight }: any) => {
    if (isRight) {
      setNumberConsecutiveRightAnswers((prev: number) => prev + 1);
      if (
        numberConsecutiveRightAnswers >= 3 &&
        numberConsecutiveRightAnswers <= 6
      ) {
        setScore((prev: number) => prev + 20);
        setIsColorHeaderShow(true);
        setIsHeaderYellow(true);
      } else if (
        numberConsecutiveRightAnswers >= 7 &&
        numberConsecutiveRightAnswers <= 10
      ) {
        setScore((prev: number) => prev + 40);
        setIsColorHeaderShow(true);
        setIsHeaderYellow(false);
      } else if (numberConsecutiveRightAnswers > 10) {
        setScore((prev: number) => prev + 80);
        setIsColorHeaderShow(true);
        setIsHeaderYellow(false);
      } else {
        setScore((prev: number) => prev + 10);
        setIsColorHeaderShow(false);
        setIsHeaderYellow(false);
      }
    } else {
      setNumberConsecutiveRightAnswers(0);
      setIsColorHeaderShow(false);
      setIsHeaderYellow(false);
    }
  };

  return (
    <StyledGrid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <GameHeader
        setIsSoundOn={setIsSoundOn}
        isSoundOn={isSoundOn}
        setIsGameStart={setIsGameStart}
        setRightAnswers={setRightAnswers}
      />
      <Typography variant="h3" style={{ color: 'green', marginBottom: '10px' }}>
        {score}{' '}
      </Typography>
      <StyledPaper
        answer={isAnswerRight.toString()}
        border={isBorderShow.toString()}
      >
        <PaperHeader
          numberConsecutiveRightAnswers={numberConsecutiveRightAnswers}
          isСolorHeaderShow={isСolorHeaderShow}
          isHeaderYellow={isHeaderYellow}
          randomWord={randomWord}
        />
        <Typography variant="h4" align="center" style={{ color: '#2a3c4d' }}>
          {randomWord?.word}
        </Typography>
        <Typography variant="h5" align="center" style={{ color: '#2a3c4d' }}>
          {translateRandomWord}
        </Typography>
        <GameButtons
          checkRightButton={checkRightButton}
          checkWrongButton={checkWrongButton}
          getRandomWord={getRandomWord}
        />
      </StyledPaper>
      <Timer
        isWrongTranslationAdded={isWrongTranslationAdded}
        setIsGameStart={setIsGameStart}
      />
    </StyledGrid>
  );
};
