import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Favorite, VolumeUp, VolumeOff } from '@material-ui/icons';
import { BigLoader } from 'components/Authorization/components/BigLoader';
import { FaillingWord } from 'components/Content/Games/Savannah/components/FallingWord';
import { Answers } from 'components/Content/Games/Savannah/components/Answers';
import { PAGE_NUMBER } from 'constants/pageNumber';
import { getWords } from 'api/words';
import { IWord } from 'types';
import { ArrowBack } from '@material-ui/icons';
import styled from 'styled-components';
import useSound from 'use-sound';
import { useParams } from 'react-router';
import { connect } from 'react-redux';
const wrongAnswerSound = require('assets/sounds/wrongAnswer.mp3');
const rightAnswerSound = require('assets/sounds/rightAnswer.mp3');

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    position: absolute;
    top: 20px;
    left: 30px;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
    }
    @media (max-width: 700px) {
      top: 3px;
      left: 5px;
    }
  }
`;

const StyledIconGrid = styled(Grid)`
  position: absolute;
  top: 30px;
  right: 30px;
  @media (max-width: 700px) {
    top: 5px;
    right: 5px;
  }
`;

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
}

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setAllRightAnswers: (allRightAnswers: any) => void;
  setAllWrongAnswers: (allWrongAnswers: any) => void;
  level: number;
  isAuth: boolean;
  currentWords: IWord[];
}

const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  setAllRightAnswers,
  setAllWrongAnswers,
  level,
  isAuth,
  currentWords,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [responseOptions, setResponseOptions] = useState<string[]>([]);
  const [rightAnswer, setRightAnswer] = useState<string | []>('');
  const [wrongAnswer, setWrongAnswer] = useState<string | []>('');
  const [lifes, setLifes] = useState<string[]>(Array(5).fill('red'));
  const [timeLeft, setTimeLeft] = useState(6);
  const [showWord, setShowWord] = useState('inherit');
  const [isSoundOn, setIsSoundOn] = useState(true);

  const params: IParams = useParams();
  const [playWrongAnswer] = useSound(wrongAnswerSound.default, {
    volume: 0.45,
  });
  const [playRightAnswer] = useSound(rightAnswerSound.default, {
    volume: 0.35,
  });

  const simpleHideWord = () => {
    setShowWord('none');
  };

  const simpleShowWord = () => {
    setShowWord('inherit');
  };

  useEffect(() => {
    if (isAuth && params.link) {
      setWords(currentWords);
      setIsDataLoaded(true);
    } else {
      getWords(level, Math.floor(Math.random() * PAGE_NUMBER)).then((res) => {
        setWords(res);
        setIsDataLoaded(true);
      });
    }
  }, [level, params, isAuth, currentWords]);

  useEffect(() => {
    if (isDataLoaded) {
      getRandomWord();
    }
    // eslint-disable-next-line
  }, [isDataLoaded]);

  useEffect(() => {
    if (
      (playedWords.length === words.length && words.length) ||
      lifes.every((life) => life === 'seashell')
    ) {
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
    for (let i = 0; i < 3; i++) {
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
    if (response === randomWord?.wordTranslate) {
      setAllRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      setRightAnswer(response);
      if (isSoundOn) {
        playRightAnswer();
      }
    } else {
      setAllWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      setWrongAnswer(response);
      if (isSoundOn) {
        playWrongAnswer();
      }
      setLifes((prev: string[]) => {
        prev.splice(0, 1);
        return [...prev, 'seashell'];
      });
      if (randomWord?.wordTranslate) {
        setRightAnswer(randomWord?.wordTranslate);
      }
    }
  };

  const handleAnswerClick = (response: string) => {
    simpleHideWord();
    let sec = setTimeout(() => {
      setTimeLeft((prev: number) => (prev = 6));
    });
    checkIsAnswerRight(response);
    if (randomWord && !playedWords.includes(randomWord?.word)) {
      setPlayedWords((prev: string[]) => [...prev, randomWord?.word]);
    }
    setTimeout(() => {
      getRandomWord();
      setRightAnswer('');
      setWrongAnswer('');
    }, 1000);
    return function cleanUp() {
      clearTimeout(sec);
    };
  };

  useEffect(() => {
    simpleShowWord();
    if (timeLeft > 0) {
      let sec = setTimeout(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
      return function cleanUp() {
        clearTimeout(sec);
      };
    } else {
      let sec = setTimeout(() => {
        setTimeLeft((prev: number) => (prev = 6));
      }, 1000);
      handleAnswerClick('undefined');
      return function cleanUp() {
        clearTimeout(sec);
      };
    }
    // eslint-disable-next-line
  }, [timeLeft]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ height: '100vh', position: 'relative' }}
    >
      {!isDataLoaded ? (
        <BigLoader />
      ) : (
        <>
          <StyledIconButton
            onClick={() => {
              setIsGameStart(false);
              setAllRightAnswers([]);
              setAllWrongAnswers([]);
            }}
          >
            <ArrowBack fontSize="large" style={{ color: '#fff' }} />
          </StyledIconButton>
          <StyledIconGrid>
            {lifes.map((life: string, index: number) => (
              <Favorite
                key={index}
                style={{
                  color: `${life}`,
                  margin: '3px',
                  width: '25px',
                  height: '25px',
                }}
              ></Favorite>
            ))}
          </StyledIconGrid>

          <FaillingWord
            randomWord={randomWord}
            showWord={showWord}
            timeLeft={timeLeft}
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Answers
              handleAnswerClick={handleAnswerClick}
              responseOptions={responseOptions}
              rightAnswer={rightAnswer.toString()}
              wrongAnswer={wrongAnswer.toString()}
            />
            <StyledIconButton
              style={{ top: '0', left: '0', right: '45px', bottom: '30px' }}
              onClick={() => setIsSoundOn(!isSoundOn)}
            >
              {isSoundOn ? (
                <VolumeUp fontSize="large" style={{ color: '#fff' }} />
              ) : (
                <VolumeOff fontSize="large" style={{ color: '#fff' }} />
              )}
            </StyledIconButton>
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
