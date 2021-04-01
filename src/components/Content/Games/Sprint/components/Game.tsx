import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import getWords from '../../../../../api/words';
import styled from 'styled-components';
import { GameHeader } from '../components/GameHeader';
import { PAGESNUMBER } from '../../../../../constants/pagesNumber';
import useSound from 'use-sound';
const wrongAnswerSound = require('../../../../../assets/sounds/wrongAnswer.mp3');
const rightAnswerSound = require('../../../../../assets/sounds/rightAnswer.mp3');
const isEmpty = require('lodash.isempty');

const StyledGrid = styled(Grid)`
  position: relative;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  width: 10vw;
  height 7vh;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  position: relative;
  width: 40vw;
  height: 40vh;
  &.MuiPaper-root {
    background-color: #ffd6cf;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
  const [translation, setTranslation] = useState('');
  const [rightAnswers, setRightAnswers] = useState<IWord[] | []>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[] | []>([]);
  const [isSoundOn, setIsSoundOn] = useState(false);
  // const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isWrongTranslationAdded, setIsWrongTranslationAdded] = useState(false);
  const [score, setScore] = useState(0);

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
    setTranslation(randomWord.wordTranslate[Math.round(Math.random())]);
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

  const checkRightButton = () => {
    if (randomWord.wordTranslate[0] === translation) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
        setScore((prev: number) => prev + 10);
      }
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playWrongAnswer();
      }
    }
  };
  const checkWrongButton = () => {
    console.log(randomWord.wordTranslate[0], translation);
    if (randomWord.wordTranslate[0] !== translation) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playRightAnswer();
      }
      setScore((prev: number) => prev + 10);
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (isSoundOn) {
        playWrongAnswer();
      }
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
      <Typography>{score} </Typography>
      <StyledPaper>
        <Typography variant="h4" align="center">
          {isEmpty(randomWord) ? '' : randomWord.word}{' '}
        </Typography>
        <Typography variant="h5" align="center">
          {isEmpty(randomWord) ? '' : translation}{' '}
        </Typography>
        <Grid container alignItems="center" justify="center" spacing={2}>
          <Grid item>
            <StyledButton
              variant="contained"
              style={{ background: '#f13434' }}
              onClick={() => {
                checkWrongButton();
                getRandomWord();
              }}
            >
              Неверно
            </StyledButton>
          </Grid>
          <Grid item>
            <StyledButton
              variant="contained"
              style={{ background: '#11a911' }}
              onClick={() => {
                checkRightButton();
                getRandomWord();
              }}
            >
              Верно
            </StyledButton>
          </Grid>
        </Grid>
        <Typography>{timer} </Typography>
      </StyledPaper>
    </StyledGrid>
  );
};
