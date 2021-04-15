import React, { useState, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import { BigLoader } from 'components/Authorization/components/BigLoader';
import { WordInfo } from 'components/Content/Games/Audiocall/components/WordInfo';
import { Answers } from 'components/Content/Games/Audiocall/components/Answers';
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

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setAllRightAnswers: (allRightAnswers: any) => void;
  setAllWrongAnswers: (allWrongAnswers: any) => void;
  level: number;
  isAuth: boolean;
  currentWords: IWord[];
}

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
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
  const [isRightWordShown, setIsRightWordShown] = useState(false);
  const [rightAnswer, setRightAnswer] = useState<string | []>('');
  const [wrongAnswer, setWrongAnswer] = useState<string | []>('');
  const [circlesColors, setCirclesColors] = useState<string[] | []>([]);
  const params: IParams = useParams();

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
      setCirclesColors(Array(words.length).fill(''));
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
    if (response === randomWord?.wordTranslate) {
      setAllRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      setRightAnswer(response);
      setCirclesColors((prev: any) => {
        prev.splice(playedWords.length, 1, 'darkgreen');
        return [...prev];
      });
    } else {
      setAllWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      setWrongAnswer(response);
      setCirclesColors((prev: any) => {
        prev.splice(playedWords.length, 1, 'firebrick');
        return [...prev];
      });

      if (randomWord?.wordTranslate) {
        setRightAnswer(randomWord?.wordTranslate);
      }
    }
  };

  const handleAnswerClick = (response: string) => {
    if (!isRightWordShown) {
      checkIsAnswerRight(response);
      setIsRightWordShown(true);
      if (randomWord && !playedWords.includes(randomWord?.word)) {
        setPlayedWords((prev: string[]) => [...prev, randomWord?.word]);
      }
    }
  };

  const handleNextWordClick = () => {
    if (isRightWordShown) {
      setIsRightWordShown(false);
      getRandomWord();
      setRightAnswer('');
      setWrongAnswer('');
    } else {
      setIsRightWordShown(true);
      setAllWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      if (randomWord) {
        setRightAnswer(randomWord?.wordTranslate);
      }
      if (randomWord && !playedWords.includes(randomWord?.word)) {
        setPlayedWords((prev: string[]) => [...prev, randomWord?.word]);
      }
      setCirclesColors((prev: any) => {
        prev.splice(playedWords.length, 1, 'gold');
        return [...prev];
      });
    }
  };

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
              setAllRightAnswers([]);
              setAllWrongAnswers([]);
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
            <Grid container alignItems="center" justify="center">
              {circlesColors.map((color: string, index: number) => (
                <Lens
                  key={index}
                  style={{
                    color: `${color ? color : 'gray'}`,
                    margin: '3px',
                    width: '15px',
                  }}
                />
              ))}
            </Grid>
            <WordInfo
              isRightWordShown={isRightWordShown}
              randomWord={randomWord}
            />
            <Answers
              handleAnswerClick={handleAnswerClick}
              handleNextWordClick={handleNextWordClick}
              responseOptions={responseOptions}
              rightAnswer={rightAnswer.toString()}
              wrongAnswer={wrongAnswer.toString()}
              isRightWordShown={isRightWordShown}
            />
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
