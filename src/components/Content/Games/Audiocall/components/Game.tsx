import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Button, Typography } from '@material-ui/core';
import { ArrowBack, VolumeUp, TrendingFlat } from '@material-ui/icons';
import { PAGE_NUMBER } from 'constants/pageNumber';
import { getWords } from 'api/words';
import { IWord } from 'components/Content/Games/types';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
    }
  }
`;

const StyledButtonResponse = styled(Button)`
  &.MuiButton-root {
    min-height: 60px;
    min-width: 200px;
    margin: 10px;
    background: #004a902e;
    color: #fff;
    transform: scale(1);
    transition: all 0.5s;
    &:hover {
      background: #004a902e;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
    &.MuiButton-outlined {
      border: 3px solid #ffab00;
    }
    @media (max-width: 700px) {
      min-width: 100px;
    }
  }
`;

const StyledButtonAudio = styled(Button)`
  &.MuiButton-root {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 100px;
    background: #004a907d;
    &:hover {
      background: #004a907d;
      transition: all 0.5s;
    }
  }
`;

const StyledImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 16px;
  border: 3px solid #004a907d;
  margin-right: 30px;
  @media (max-width: 700px) {
    margin-right: 0;
  }
`;

const StyledVolumeUp = styled(VolumeUp)`
  &.MuiSvgIcon-root {
    width: 100px;
    height: 100px;
    transition: all 0.5s;
    color: #fff;
    &:hover {
      color: #ffab00;
      transition: all 0.5s;
    }
  }
`;

const StyledTypography = styled(Typography)`
  color: #fff;
`;

const WrapperGrid = styled(Grid)`
  margin-bottom: 4%;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setRightAnswers: (rightAnswers: any) => void;
  setWrongAnswers: (wrongAnswers: any) => void;
  level: number;
}

export const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  setRightAnswers,
  setWrongAnswers,
  level,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [responseOptions, setResponseOptions] = useState<string[]>([]);
  const [isRightWordShown, setIsRightWordShown] = useState(false);

  const playEnglishSound = (name: string | undefined) => {
    const audio = new Audio();
    audio.src = `https://dream-react-rslang-server.herokuapp.com/${name}`;
    audio.play();
  };

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

  useEffect(() => {
    if (randomWord) {
      playEnglishSound(randomWord?.audio);
    }
  }, [randomWord]);

  useEffect(() => {
    if (playedWords.length === words.length && words.length) {
      setIsGameStart(false);
    }
    // eslint-disable-next-line
  }, [playedWords, words]);

  const getRandomWord = () => {
    let randomWord = words[Math.floor(Math.random() * words.length)];
    while (playedWords.includes(randomWord.word)) {
      randomWord = words[Math.floor(Math.random() * words.length)];
    }
    setRandomWord(randomWord);
    getResponseOptions(randomWord);
  };

  const getResponseOptions = (randomWord: IWord) => {
    let arrResponse: any = [randomWord?.wordTranslate];
    for (let i = 0; i < 4; i++) {
      let randomResponse = words[Math.floor(Math.random() * words.length)];
      while (arrResponse.includes(randomResponse.wordTranslate)) {
        randomResponse = words[Math.floor(Math.random() * words.length)];
      }
      arrResponse = [...arrResponse, randomResponse.wordTranslate];
    }
    arrResponse.sort(() => Math.random() - 0.5);
    setResponseOptions(arrResponse);
  };

  const checkIsAnswerRight = (response: string) => {
    console.log(response, randomWord?.wordTranslate);
    if (response === randomWord?.wordTranslate) {
      setRightAnswers((prev: IWord[]) => [...prev, randomWord]);
    } else {
      setWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="flex-start"
      style={{ height: '100vh' }}
    >
      <Grid
        container
        alignItems="center"
        justify="flex-start"
        style={{ padding: '30px 50px', marginBottom: '-70px' }}
      >
        <StyledIconButton
          onClick={() => {
            setIsGameStart(false);
            setRightAnswers([]);
          }}
        >
          <ArrowBack fontSize="large" style={{ color: '#fff' }} />
        </StyledIconButton>
      </Grid>

      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ flex: 1 }}
      >
        {isRightWordShown ? (
          <WrapperGrid
            container
            direction="row"
            alignItems="center"
            justify="center"
          >
            <StyledImage
              src={`https://dream-react-rslang-server.herokuapp.com/${randomWord?.image}`}
              alt={`https://dream-react-rslang-server.herokuapp.com/${randomWord?.word}`}
            />
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-around"
              style={{ width: '500px' }}
            >
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <VolumeUp onClick={() => playEnglishSound(randomWord?.audio)} />
                <StyledTypography variant="h6">
                  {randomWord?.word}{' '}
                  <em style={{ color: '#ffab00' }}>
                    {randomWord?.transcription}
                  </em>
                </StyledTypography>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <VolumeUp
                  onClick={() => playEnglishSound(randomWord?.audioExample)}
                />
                <StyledTypography variant="h6">
                  {randomWord?.textExample}{' '}
                </StyledTypography>
              </Grid>
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <StyledTypography variant="h6">
                  {randomWord?.textExampleTranslate}{' '}
                </StyledTypography>
              </Grid>
            </Grid>
          </WrapperGrid>
        ) : (
          <StyledButtonAudio
            variant="contained"
            onClick={() => {
              playEnglishSound(randomWord?.audio);
            }}
          >
            <StyledVolumeUp />
          </StyledButtonAudio>
        )}
        <Grid container alignItems="center" justify="center">
          {responseOptions.map((response, index) => {
            return (
              <StyledButtonResponse
                variant="outlined"
                key={response}
                onClick={() => {
                  if (randomWord && !playedWords.includes(randomWord?.word)) {
                    setPlayedWords((prev: string[]) => [
                      ...prev,
                      randomWord?.word,
                    ]);
                  }
                  checkIsAnswerRight(response);
                  setIsRightWordShown(true);
                }}
              >
                {index + 1} {response}{' '}
              </StyledButtonResponse>
            );
          })}
        </Grid>
        <Grid container alignItems="center" justify="center">
          <StyledButtonResponse
            variant="contained"
            style={{
              width: '200px',
              marginTop: '3%',
            }}
            onClick={() => {
              if (isRightWordShown) {
                setIsRightWordShown(false);
                getRandomWord();
              } else {
                setIsRightWordShown(true);
              }
            }}
          >
            {isRightWordShown ? <TrendingFlat fontSize="large" /> : 'Не знаю'}
          </StyledButtonResponse>
        </Grid>
      </Grid>
    </Grid>
  );
};
