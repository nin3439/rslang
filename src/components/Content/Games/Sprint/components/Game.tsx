import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import getWords from '../../../../../api/words';
import { GameHeader } from '../components/GameHeader';
import { PaperHeader } from '../components/PaperHeader';
import { GameButtons } from '../components/GameButtons';
import { PAGESNUMBER } from '../../../../../constants/pagesNumber';
import useSound from 'use-sound';
import styled from 'styled-components';
const wrongAnswerSound = require('../../../../../assets/sounds/wrongAnswer.mp3');
const rightAnswerSound = require('../../../../../assets/sounds/rightAnswer.mp3');
const isEmpty = require('lodash.isempty');

const StyledGrid = styled(Grid)`
  position: relative;
  height: 100vh;
`;

const StyledTimerBox = styled(Box)`
  color: #fff;
  border: 5px solid #fff;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: 50%;
  right: 20%;
`;

interface StyledProps {
  isAnswerRight: boolean;
  isBorderShow: boolean;
}

const StyledPaper = styled(Paper)`
  position: relative;
  width: 350px;
  height: 400px;
  &.MuiPaper-root {
    background-color: #ffd6cf;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &.MuiPaper-elevation1 {
    box-shadow: ${(p: StyledProps) =>
      p.isBorderShow
        ? p.isAnswerRight
          ? 'inset 0 0 0 5px #11a911'
          : 'inset 0 0 0 5px #f13434'
        : 'none'};
  }
`;

interface IWord {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string | [];
}

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  level: number;
}

export const Game: React.FC<IGameProps> = ({ setIsGameStart, level }) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<any>({});
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [translateRandomWord, setTranslateRandomWord] = useState('');
  const [rightAnswers, setRightAnswers] = useState<IWord[] | []>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[] | []>([]);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isWrongTranslationAdded, setIsWrongTranslationAdded] = useState(false);
  const [score, setScore] = useState(0);
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
    getWords(level, Math.floor(Math.random() * PAGESNUMBER)).then((res) => {
      addWrongTranslation(res);
    });
  }, [level]);

  useEffect(() => {
    if (words.length === 5) {
      getWords(level, Math.floor(Math.random() * PAGESNUMBER)).then((res) => {
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

  useEffect(() => {
    if (words.length) {
      if (timer) {
        let sec = setTimeout(() => {
          setTimer((prev: number) => prev - 1);
        }, 1000);
        return function cleanUp() {
          clearTimeout(sec);
        };
      } else {
        setIsGameStart(false);
        console.log(rightAnswers);
        console.log(wrongAnswers);
      }
    }
    // eslint-disable-next-line
  }, [timer, words]);
  console.log(isAnswerRight, numberConsecutiveRightAnswers);

  const checkRightButton = () => {
    if (randomWord.wordTranslate[0] === translateRandomWord) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
      }
      setIsAnswerRight(true);
      updateScore({ isRight: true });
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
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
    if (randomWord.wordTranslate[0] !== translateRandomWord) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
      }
      setIsAnswerRight(true);
      updateScore({ isRight: true });
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
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
      />
      <Typography variant="h3" style={{ color: 'green', marginBottom: '10px' }}>
        {score}{' '}
      </Typography>
      <StyledPaper isAnswerRight={isAnswerRight} isBorderShow={isBorderShow}>
        <PaperHeader
          numberConsecutiveRightAnswers={numberConsecutiveRightAnswers}
          isСolorHeaderShow={isСolorHeaderShow}
          isHeaderYellow={isHeaderYellow}
        />
        <Typography variant="h4" align="center" style={{ color: '#343e48' }}>
          {isEmpty(randomWord) ? '' : randomWord.word}{' '}
        </Typography>
        <Typography variant="h5" align="center" style={{ color: '#343e48' }}>
          {isEmpty(randomWord) ? '' : translateRandomWord}{' '}
        </Typography>
        <GameButtons
          checkRightButton={checkRightButton}
          checkWrongButton={checkWrongButton}
          getRandomWord={getRandomWord}
        />
      </StyledPaper>
      <StyledTimerBox>
        <Typography variant="h3" align="center" style={{ width: '55px' }}>
          {timer}{' '}
        </Typography>
      </StyledTimerBox>
    </StyledGrid>
  );
};
