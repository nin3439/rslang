import { Button } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';
import React from 'react';
import { API_URL } from '../../../../../config';
import { IWord } from '../../../../../types';
import {
  StyledImg,
  StyledWords,
  StyledPage,
  StyleWord,
  StyleButtons,
} from './style';
interface IWordProps {
  word: IWord;
}

export const Word = ({ word }: IWordProps) => {
  const audio = new Audio(`${API_URL}/${word.audio}`);
  const difficultWord = (word: string, id: string) => {
    const body = {
      difficulty: 'weak',
      optional: {},
    };
  };
  return (
    <StyledPage>
      <StyledImg src={`${API_URL}/${word.image}`} alt="" />
      <StyledWords>
        <StyleWord>
          <h2>{word.word}</h2>
          <VolumeUp
            onClick={() => {
              audio.play();
            }}
          />
        </StyleWord>
        <p>{word.textMeaning}</p>
        <p>{word.textExample}</p>
        <p>{word.transcription}</p>
        <p>{word.textExampleTranslate}</p>
        <p>{word.textMeaningTranslate}</p>
        <p>{word.wordTranslate}</p>
        <StyleButtons>
          <Button onClick={() => difficultWord(word.word, word.id)}>
            Сохранить
          </Button>
          <Button>Удалить</Button>
        </StyleButtons>
      </StyledWords>
    </StyledPage>
  );
};
