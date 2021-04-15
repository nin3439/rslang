import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Typography, Button } from '@material-ui/core';
import { VolumeUp, MicOff } from '@material-ui/icons';
import { BigLoader } from 'components/Authorization/components/BigLoader';
import { playEnglishSound } from 'components/Content/Games/Audiocall/utils';
import { PAGE_NUMBER } from 'constants/pageNumber';
import { getWords } from 'api/words';
import { IWord } from 'components/Content/Games/types';
import { ArrowBack } from '@material-ui/icons';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { connect } from 'react-redux';

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 30px;
    left: 30px;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
    }
    @media (max-width: 700px) {
      top: 5px;
      left: 5px;
    }
  }
`;

const StyledGridWord = styled(Button)`
  &.MuiButton-root {
    width: 170px;
    background: #a45d7ac7;
    transform: scale(1);
    border-radius: 4px;
    transition: transform 0.5s;
    margin: 20px;
    padding: 5px 10px;
    z-index: 5;
    &:hover {
      background: #a45d7ac7;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

const StyledImage = styled(Grid)`
  background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3AVU2W-fN4NgtyaRClIk--AsvZmSwAA-g0sV5s12lAMvhxWP2l0AaS5y3eU9jMZa1F0&usqp=CAU);
  width: 200px;
  height: 200px;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 5px solid #5da464;
`;

const StyledMicroGrid = styled(Grid)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #a45d7a;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTypography = styled(Typography)`
  color: #fff;
  text-shadow: 1px 1px 3px black;
  text-transform: lowercase;
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    width: 300px;
    color: #fff;
    background: #5da464;
    font-size: 20px;
    transform: scale(1);
    transition: transform 0.5s;
    margin-top: 20px;
    &:hover {
      background: #5da464;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
}

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setRightAnswers: (rightAnswers: any) => void;
  setWrongAnswers: (wrongAnswers: any) => void;
  level: number;
  isAuth: boolean;
  currentWords: IWord[];
}

const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  setRightAnswers,
  setWrongAnswers,
  level,
  isAuth,
  currentWords,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [clickedWord, setClickedWord] = useState<IWord | null>(null);
  const params: IParams = useParams();

  useEffect(() => {
    if (isAuth && params.link) {
      setWords(currentWords.slice(0, 10));
      setIsDataLoaded(true);
    } else {
      getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
        setWords(res);
        setIsDataLoaded(true);
      });
    }
  }, [level, params, isAuth, currentWords]);

  const clickHandler = (event: any) => {
    console.log(event.target.id);
    if (!event.target.id) return;

    console.log(
      words.find((word) => {
        return word.id === '5e9f5ee35eb9e72bc21af4ff';
      })
    );
  };

  useEffect(() => {
    window.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('keydown', clickHandler);
    };
  });

  useEffect(() => {
    if (playedWords.length === words.length && words.length) {
      setIsGameStart(false);
    }
    // eslint-disable-next-line
  }, [playedWords, words]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: '100%', position: 'relative', overflow: 'auto' }}
    >
      {!isDataLoaded ? (
        <BigLoader />
      ) : (
        <>
          <StyledIconButton
            onClick={() => {
              setIsGameStart(false);
              setRightAnswers([]);
              setWrongAnswers([]);
            }}
          >
            <ArrowBack fontSize="large" style={{ color: '#fff' }} />
          </StyledIconButton>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid style={{ position: 'relative' }}>
              <StyledImage />
              <StyledMicroGrid>
                <MicOff fontSize="large" style={{ color: '#fff' }} />
              </StyledMicroGrid>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              {words.map((word: IWord) => (
                <StyledGridWord
                  key={word.word}
                  id={word.id}
                  onClick={() => playEnglishSound(word.audio)}
                >
                  <VolumeUp
                    id={word.id}
                    style={{
                      color: '#fff',
                      margin: '5px',
                    }}
                  />
                  <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="center"
                    id={word.id}
                  >
                    <StyledTypography id={word.id} variant="h5">
                      {' '}
                      {word.word}{' '}
                    </StyledTypography>
                    <StyledTypography id={word.id} variant="h5">
                      {' '}
                      {word.transcription}{' '}
                    </StyledTypography>
                  </Grid>
                </StyledGridWord>
              ))}
            </Grid>
            <StyledButton variant="contained"> Старт</StyledButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

const MapStateToProps = (state: any, ownprops: any) => {
  return {
    currentWords: state.textbook.currentWords,
    isAuth: state.userReducer.isAuth,
  };
};

export default connect(MapStateToProps, null)(Game);
