import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Button } from '@material-ui/core';
import { ArrowBack, VolumeUp } from '@material-ui/icons';
import { PAGE_NUMBER } from '../../../../../constants/pageNumber';
import useSound from 'use-sound';
import getWords from '../../../../../api/words';
import { IWord } from '../../../../../types';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  transform: scale(1);
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.3);
    transition: transform 0.5s;
  }
  &.MuiIconButton-root {
    color: #fff;
  }
`;

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setRightAnswers: (rightAnswers: any) => void;
  level: number;
}

export const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  setRightAnswers,
  level,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [playEnglishWord] = useSound(
    `https://dream-react-rslang-server.herokuapp.com/${randomWord?.audio}`
  );

  useEffect(() => {
    getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
      setWords(res);
      setIsDataLoaded(true);
    });
  }, [level]);

  useEffect(() => {
    if (isDataLoaded) {
      getRandomWord();
    }
    // eslint-disable-next-line
  }, [isDataLoaded]);

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
    }
  };

  console.log(randomWord);

  return (
    <Grid>
      <StyledIconButton
        onClick={() => {
          setIsGameStart(false);
          setRightAnswers([]);
        }}
      >
        <ArrowBack fontSize="large" />
      </StyledIconButton>
      <Grid>
        <Button variant="contained" onClick={() => playEnglishWord()}>
          <VolumeUp />
        </Button>
      </Grid>
    </Grid>
  );
};
