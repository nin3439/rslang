import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';
import { getWords } from 'api/words';
import { getRandomPageNumber } from 'components/Content/Games/Sprint/utils';
import { GameHeader } from 'components/Content/Games/Sprint/components/GameHeader';
import { PaperHeader } from 'components/Content/Games/Sprint/components/PaperHeader';
import { GameButtons } from 'components/Content/Games/Sprint/components/GameButtons';
import { Timer } from 'components/Content/Games/Sprint/components/Timer';
import { Start } from 'components/Content/Games/commonComponents/StartLoader';
import { IWord } from 'types';
import useSound from 'use-sound';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import { BigLoader } from 'components/Authorization/components/BigLoader';
const wrongAnswerSound = require('assets/sounds/wrongAnswer.mp3');
const rightAnswerSound = require('assets/sounds/rightAnswer.mp3');
const inRange = require('lodash.inrange');

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
    }};
  }
  @media (max-width: 1300px) {
    width: 400px;
    height: 400px;
  }
`;

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
}

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
  isAuth: boolean;
  currentWords: IWord[];
}

const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  level,
  setWrongAnswers,
  setRightAnswers,
  score,
  setScore,
  isAuth,
  currentWords,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [translateRandomWord, setTranslateRandomWord] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isWrongTranslationAdded, setIsWrongTranslationAdded] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(false);
  const [isBorderShow, setIsBorderShow] = useState(false);
  const [
    numberConsecutiveRightAnswers,
    setNumberConsecutiveRightAnswers,
  ] = useState(0);
  const [isStartProgresShown, setIsStartProgresShown] = useState(true);
  const params: IParams = useParams();

  const [playWrongAnswer] = useSound(wrongAnswerSound.default, {
    volume: 0.45,
  });
  const [playRightAnswer] = useSound(rightAnswerSound.default, {
    volume: 0.35,
  });

  const addWrongTranslation = (res: IWord[]) => {
    const wordsWithWrongTranslate = res.map((word: IWord, index: number) => ({
      ...word,
      wordTranslate: [
        word.wordTranslate,
        res[(index !== 0 ? index : res.length) - 1].wordTranslate,
      ],
    }));
    setWords((prev: any) => {
      return [...prev, ...wordsWithWrongTranslate];
    });
    setIsWrongTranslationAdded(true);
  };

  useEffect(() => {
    if (params.link) {
      addWrongTranslation(currentWords);
    } else {
      getWords(level, getRandomPageNumber()).then((res) => {
        addWrongTranslation(res);
      });
    }
  }, [level, params, isAuth, currentWords]);

  useEffect(() => {
    if (words.length === 5) {
      getWords(level, getRandomPageNumber()).then((res) => {
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
      switch (true) {
        case inRange(numberConsecutiveRightAnswers, 3, 7):
          return setScore((prev: number) => prev + 20);
        case inRange(numberConsecutiveRightAnswers, 7, 11):
          return setScore((prev: number) => prev + 40);
        case numberConsecutiveRightAnswers > 10:
          return setScore((prev: number) => prev + 80);
        default:
          return setScore((prev: number) => prev + 10);
      }
    } else {
      setNumberConsecutiveRightAnswers(0);
    }
  };

  return (
    <StyledGrid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      {isStartProgresShown ? (
        <Start setIsStartProgresShown={setIsStartProgresShown} />
      ) : !isWrongTranslationAdded ? (
        <BigLoader />
      ) : (
        <>
          <GameHeader
            setIsSoundOn={setIsSoundOn}
            isSoundOn={isSoundOn}
            setIsGameStart={setIsGameStart}
            setRightAnswers={setRightAnswers}
            setWrongAnswers={setWrongAnswers}
          />
          <Typography
            variant="h3"
            style={{ color: 'green', marginBottom: '10px' }}
          >
            {score}{' '}
          </Typography>
          <StyledPaper
            answer={isAnswerRight.toString()}
            border={isBorderShow.toString()}
          >
            <PaperHeader
              numberConsecutiveRightAnswers={numberConsecutiveRightAnswers}
              randomWord={randomWord}
            />
            <Typography
              variant="h4"
              align="center"
              style={{ color: '#2a3c4d' }}
            >
              {randomWord?.word}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              style={{ color: '#2a3c4d' }}
            >
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
        </>
      )}
    </StyledGrid>
  );
};

const MapStateToProps = (state: any, ownprops: any) => {
  return {
    currentWords: state.textbook.currentWords,
    isAuth: state.userReducer.isAuth,
  };
};

export default connect(MapStateToProps, null)(Game);
