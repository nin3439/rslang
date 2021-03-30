import React, { useEffect, useState } from 'react';
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import getWords from '../../../../../api/words';
import styled from 'styled-components';
const isEmpty = require('lodash.isempty');

const StyledPaper = styled(Paper)`
  width: 40vw;
  height: 40vh;
  &.MuiPaper-root {
    background-color: #ffd6cfb0;
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
  wordTranslate: string;
}

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
}

export const Game: React.FC<IGameProps> = ({ setIsGameStart }) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<any>({});
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [timer, setTimer] = useState(60);
  const [translation, setTranslation] = useState('');
  const [rightAnswers, setRightAnswers] = useState<IWord[] | []>([]);
  const [wrongAnswers, setWrongAnswers] = useState<IWord[] | []>([]);

  const addWrongTranslation = () => {
    setWords((prev: any) => {
      return prev.map((word: any, index: number) => {
        if (index !== 0) {
          return {
            ...word,
            wordTranslate: [word.wordTranslate, prev[index - 1].wordTranslate],
          };
        } else {
          return {
            ...word,
            wordTranslate: [
              word.wordTranslate,
              prev[prev.length - 1].wordTranslate,
            ],
          };
        }
      });
    });
  };

  useEffect(() => {
    getWords(0, 0).then((res) => {
      setWords((prev: IWord[]) => [...prev, ...res]);
    });
    getWords(0, 1).then((res) => {
      setWords((prev: IWord[]) => [...prev, ...res]);
    });
    getWords(0, 2).then((res) => {
      setWords((prev: IWord[]) => [...prev, ...res]);
    });
    getWords(0, 3).then((res) => {
      setWords((prev: IWord[]) => [...prev, ...res]);
    });
    getWords(0, 4).then((res) => {
      setWords((prev: IWord[]) => [...prev, ...res]);
    });
  }, []);

  useEffect(() => {
    if (words.length === 100) {
      addWrongTranslation();
      getRandomWord();
    }
    // eslint-disable-next-line
  }, [words]);

  const getRandomWord = () => {
    if (words.length) {
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
    } else {
      return {};
    }
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
    console.log(randomWord.wordTranslate[0], translation);
    if (randomWord.wordTranslate[0] === translation) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
    }
  };
  const checkWrongButton = () => {
    console.log(randomWord.wordTranslate[0], translation);
    if (randomWord.wordTranslate[0] !== translation) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
    }
  };

  console.log(words);

  return (
    <StyledPaper>
      <Typography variant="h4" align="center">
        {isEmpty(randomWord) ? '' : randomWord.word}{' '}
      </Typography>
      <Typography variant="h5" align="center">
        {isEmpty(randomWord) ? '' : translation}{' '}
      </Typography>
      <Grid>
        <Button
          onClick={() => {
            checkWrongButton();
            getRandomWord();
          }}
        >
          Неверно
        </Button>
        <Button
          onClick={() => {
            checkRightButton();
            getRandomWord();
          }}
        >
          Верно
        </Button>
      </Grid>
      <Typography>{timer} </Typography>
    </StyledPaper>
  );
};
