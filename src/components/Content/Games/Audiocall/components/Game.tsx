import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Button } from '@material-ui/core';
import { ArrowBack, VolumeUp } from '@material-ui/icons';
import { PAGE_NUMBER } from 'constants/pageNumber';
import getWords from 'api/words';
import useSound from 'use-sound';
import { IWord } from 'components/Content/Games/types';
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

const StyledButtonResponses = styled(Button)`
  background: #2b4054;
  &.MuiButton-root {
    color: #fff;
  }
  transform: scale(1);
  transition: all 0.5s;
  &:hover {
    background: #2b4054;
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

const StyledButtonAudio = styled(Button)`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 100px;
`;

const StyledVolumeUp = styled(VolumeUp)`
  width: 100px;
  height: 100px;
  transition: all 0.5s;
  &:hover {
    color: #2b4054;
    transition: all 0.5s;
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
  const [responseOptions, setResponseOptions] = useState<string[]>([]);

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
    let randomWord = words[Math.floor(Math.random() * words.length)];
    while (playedWords.includes(randomWord.word)) {
      randomWord = words[Math.floor(Math.random() * words.length)];
    }
    setPlayedWords((prev: string[]) => [...prev, randomWord.word]);
    setRandomWord(randomWord);
    getResponseOptions(randomWord);
  };

  const getResponseOptions = (randomWord: IWord) => {
    let arrResponse: any = [randomWord?.wordTranslate];
    for (let i = 0; i < 4; i++) {
      let randomResponse = words[Math.floor(Math.random() * words.length)];
      console.log(arrResponse, randomResponse.wordTranslate);
      while (arrResponse.includes(randomResponse.wordTranslate)) {
        randomResponse = words[Math.floor(Math.random() * words.length)];
      }
      arrResponse = [...arrResponse, randomResponse.wordTranslate];
    }
    arrResponse.sort(() => Math.random() - 0.5);
    setResponseOptions(arrResponse);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="flex-start"
      style={{ height: '100vh' }}
    >
      <Grid container alignItems="center" justify="flex-start">
        <StyledIconButton
          onClick={() => {
            setIsGameStart(false);
            setRightAnswers([]);
          }}
        >
          <ArrowBack fontSize="large" />
        </StyledIconButton>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ flex: 1 }}
      >
        <StyledButtonAudio
          variant="contained"
          onClick={() => {
            playEnglishWord();
          }}
        >
          <StyledVolumeUp />
        </StyledButtonAudio>
        <Grid container alignItems="center" justify="center" spacing={3}>
          {responseOptions.map((response, index) => {
            return (
              <Grid item key={response}>
                <StyledButtonResponses variant="outlined">
                  {index + 1} {response}{' '}
                </StyledButtonResponses>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};
