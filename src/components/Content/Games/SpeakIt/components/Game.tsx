import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Typography, Button } from '@material-ui/core';
import { VolumeUp, MicOff, Mic } from '@material-ui/icons';
import { BigLoader } from 'components/Authorization/components/BigLoader';
import { playEnglishSound } from 'components/Content/Games/Audiocall/utils';
import { PAGE_NUMBER } from 'constants/pageNumber';
import { getWords } from 'api/words';
import { IWord } from 'types';
import { ArrowBack } from '@material-ui/icons';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import useSound from 'use-sound';
const rightAnswerSound = require('assets/sounds/rightAnswer.mp3');

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 10px;
    left: 10px;
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

interface StyledPropsWord {
  clicked?: string;
  id: string;
  pointer: string;
}

const StyledGridWord = styled(Button)`
  &.MuiButton-root {
    width: 15vw;
    min-width: 170px;
    background: ${(p: StyledPropsWord) => {
      return p.pointer === 'none' ? '#ccccccb5' : '#a45d7ac7';
    }};
    transform: scale(1);
    box-shadow: ${(p: StyledPropsWord) => {
      return p.clicked === p.id ? 'inset 0 0 6px #12e627' : 'none';
    }};
    border-radius: 4px;
    transition: transform 0.5s;
    margin: 15px;
    padding: 5px 10px;
    z-index: 5;
    pointer-events: ${(p: StyledPropsWord) => {
      return p.pointer;
    }};
    &:hover {
      background: #a45d7ac7;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
    @media (max-width: 1120px) {
      margin: 5px;
      padding: 0;
    }
  }
`;

interface StyledProps {
  image?: string;
}

const StyledImage = styled(Grid)`
  background-image: ${(p: StyledProps) =>
    p.image
      ? `url(https://dream-react-rslang-server.herokuapp.com/${p.image})`
      : 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf3AVU2W-fN4NgtyaRClIk--AsvZmSwAA-g0sV5s12lAMvhxWP2l0AaS5y3eU9jMZa1F0&usqp=CAU)'};
  width: 200px;
  height: 200px;
  transition: background 0.3s;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  border: 5px solid #5da464;
  @media (max-width: 1120px) {
    width: 150px;
    height: 150px;
  }
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
  &.MuiTypography-root {
    color: #fff;
    text-shadow: 1px 1px 3px black;
    text-transform: lowercase;
    @media (max-width: 1120px) {
      font-size: 16px;
    }
  }
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    width: 150px;
    color: #fff;
    background: #5da464;
    font-size: 20px;
    transform: scale(1);
    transition: transform 0.5s;
    margin: 20px;
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
  const [playedWords, setPlayedWords] = useState<any>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [clickedWord, setClickedWord] = useState<any>(null);
  const [isMicroOn, setIsMicroOn] = useState(false);
  const [isSpeakGameStart, setIsSpeakGameStart] = useState(false);

  const params: IParams = useParams();
  const [playRightAnswer] = useSound(rightAnswerSound.default, {
    volume: 0.35,
  });

  useEffect(() => {
    if (params.link) {
      setWords(currentWords.slice(0, 10));
      setIsDataLoaded(true);
    } else {
      getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
        setWords(res.slice(0, 10));
        setIsDataLoaded(true);
      });
    }
  }, [level, params, isAuth, currentWords]);

  const commands = words.map((word: IWord) => {
    return {
      command: `${word.word}`,
      callback: (command: any) => {
        setPlayedWords((prev: any) => {
          return [
            ...prev,
            words.find((word: IWord) => word.word === command.command),
          ];
        });
        setClickedWord(
          words.find((word: IWord) => word.word === command.command)
        );
        playRightAnswer();
      },
    };
  });

  const { transcript } = useSpeechRecognition({ commands });

  const findAllWrongWords = () => {
    const wrongAnswers = words.filter((word: any) => {
      return playedWords.find((playedWord: any) => playedWord.id !== word.id);
    });
    setWrongAnswers(wrongAnswers);
  };

  useEffect(() => {
    if (playedWords.length === words.length && words.length) {
      setRightAnswers(playedWords);
      setIsGameStart(false);
    } else if (!isSpeakGameStart && playedWords.length) {
      setRightAnswers(playedWords);
      findAllWrongWords();
      setIsGameStart(false);
    }
    // eslint-disable-next-line
  }, [playedWords, words, isSpeakGameStart]);

  const changeSpokenWords = (id: string) => {
    const playedWordId = playedWords.map((playedWord: any) => playedWord.id);
    return playedWordId.includes(id) ? 'none' : 'auto';
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: '100%', position: 'relative' }}
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
            justify="space-around"
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
              style={{ padding: '5vh 20vw' }}
            >
              <Grid style={{ position: 'relative' }}>
                <StyledImage image={clickedWord?.image} />
                <StyledMicroGrid>
                  {isMicroOn ? (
                    <Mic fontSize="large" style={{ color: 'red' }} />
                  ) : (
                    <MicOff fontSize="large" style={{ color: '#fff' }} />
                  )}
                </StyledMicroGrid>
              </Grid>
              <Typography
                variant="h4"
                style={{ color: '#fff', marginLeft: '20px' }}
              >
                {isMicroOn ? transcript : clickedWord?.wordTranslate}
              </Typography>
            </Grid>

            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              style={{ padding: '10px 50px' }}
            >
              {words.map((word: IWord) => (
                <StyledGridWord
                  key={word.id}
                  id={word.id}
                  clicked={clickedWord?.id}
                  pointer={changeSpokenWords(word.id)}
                  onClick={() => {
                    // console.log(word.id, clickedWord?.id);
                    if (!isSpeakGameStart) {
                      setClickedWord(word);
                      playEnglishSound(word.audio);
                    }
                  }}
                >
                  <VolumeUp
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
                  >
                    <StyledTypography variant="h5">
                      {' '}
                      {word.word}{' '}
                    </StyledTypography>
                    <StyledTypography variant="h5">
                      {' '}
                      {word.transcription}{' '}
                    </StyledTypography>
                  </Grid>
                </StyledGridWord>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              {isSpeakGameStart && (
                <StyledButton
                  variant="contained"
                  onClick={() => {
                    setIsMicroOn(!isMicroOn);
                    if (isMicroOn) {
                      SpeechRecognition.stopListening();
                    } else {
                      SpeechRecognition.startListening({
                        language: 'en-US',
                      });
                    }
                  }}
                >
                  Дальше
                </StyledButton>
              )}
              <StyledButton
                variant="contained"
                onClick={() => {
                  if (!isSpeakGameStart) {
                    setIsSpeakGameStart(true);
                    setClickedWord(null);
                    setIsMicroOn(true);
                    SpeechRecognition.startListening({
                      language: 'en-US',
                    });
                  } else {
                    setIsSpeakGameStart(false);
                  }
                }}
              >
                {isSpeakGameStart ? 'Стоп' : 'Старт'}
              </StyledButton>
            </Grid>
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
