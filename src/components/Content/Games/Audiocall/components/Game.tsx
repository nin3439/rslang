import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { BigLoader } from 'components/Authorization/components/BigLoader';
import { GameHeader } from 'components/Content/Games/Audiocall/components/GameHeader';
import { WordInfo } from 'components/Content/Games/Audiocall/components/WordInfo';
import { Answers } from 'components/Content/Games/Audiocall/components/Answers';
import { playEnglishSound } from 'components/Content/Games/Audiocall/utils';
import { PAGE_NUMBER } from 'constants/pageNumber';
import { getWords } from 'api/words';
import { IWord } from 'components/Content/Games/types';

interface IGameProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setAllRightAnswers: (allRightAnswers: any) => void;
  setAllWrongAnswers: (allWrongAnswers: any) => void;
  level: number;
}

export const Game: React.FC<IGameProps> = ({
  setIsGameStart,
  setAllRightAnswers,
  setAllWrongAnswers,
  level,
}) => {
  const [words, setWords] = useState<IWord[] | []>([]);
  const [randomWord, setRandomWord] = useState<IWord | null>(null);
  const [playedWords, setPlayedWords] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [responseOptions, setResponseOptions] = useState<string[]>([]);
  const [isRightWordShown, setIsRightWordShown] = useState(false);
  const [rightAnswer, setRightAnswer] = useState<string | []>('');
  const [wrongAnswer, setWrongAnswer] = useState<string | []>('');

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
    if (response === randomWord?.wordTranslate) {
      setAllRightAnswers((prev: IWord[]) => [...prev, randomWord]);
      setRightAnswer(response);
    } else {
      setAllWrongAnswers((prev: IWord[]) => [...prev, randomWord]);
      setWrongAnswer(response);
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
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="flex-start"
      style={{ height: '100%', position: 'relative', overflow: 'auto' }}
    >
      {!isDataLoaded ? (
        <BigLoader />
      ) : (
        <>
          <GameHeader
            setIsGameStart={setIsGameStart}
            setAllRightAnswers={setAllRightAnswers}
          />
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
            style={{ flex: 1 }}
          >
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
