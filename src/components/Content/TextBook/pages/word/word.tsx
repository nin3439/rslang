import React from 'react';
import { API_URL } from 'config';
import { VolumeUp } from '@material-ui/icons';
import { IUpdateWord, IWord } from 'types';
import {
  StyledImg,
  StyledWords,
  StyledPage,
  StyleWord,
  StyleButtons,
  StyledButton,
} from 'components/Content/TextBook/pages/word/style';
interface IWordProps {
  word: IWord;
  updateWord: (body: IUpdateWord, idWord: string) => void;
}

export const Word = ({ word, updateWord }: IWordProps) => {
  const audio = new Audio(`${API_URL}/${word.audio}`);
  const difficultWord = (word: string, id: string) => {
    const body = {
      difficulty: 'hard',
      optional: {
        delete: false,
      },
    };
    updateWord(body, id);
  };
  return (
    <StyledPage>
      <StyledImg src={`${API_URL}/${word.image}`} alt="" />
      <StyledWords>
        <StyleWord>
          <h2>{word.word}</h2>
          <VolumeUp
            onClick={() => {
              const play = audio.play().then((res) => {
                setTimeout(() => {
                  audio.src = `${API_URL}/${word.audioExample}`;
                  audio.play();
                }, 500);
              });
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
          <StyledButton
            onClick={() => {
              difficultWord(word.word, word['_id']);
            }}
          >
            Сложное слово
          </StyledButton>
          <StyledButton>Удалить</StyledButton>
        </StyleButtons>
      </StyledWords>
    </StyledPage>
  );
};
