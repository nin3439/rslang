import React from 'react';
import { API_URL } from 'config';
import { VolumeUp } from '@material-ui/icons';
import { IOptions, IPropsUpdate, IWord } from 'types';
import {
  StyledImg,
  StyleButtons,
  StyledButton,
} from 'components/Content/TextBook/pages/word/style';
import {
  TeamBlock,
  TeamCard,
  TeamCardActionArea,
  StyledIconButton,
} from './style';
import { CardActions, CardContent, Typography } from '@material-ui/core';
interface IWordProps {
  word: IWord;
  updateWord: (
    body: IPropsUpdate,
    idWord: string,
    method: 'post' | 'put'
  ) => void;
  options: IOptions;
}
export const Word = ({ word, updateWord, options }: IWordProps) => {
  const audio = new Audio(`${API_URL}/${word.audio}`);
  const difficultWord = (id: string, value: string) => {
    const body = {
      difficulty: value,
      optional: {},
    };
    const method = word.userWord ? 'put' : 'post';
    updateWord(body, id, method);
  };
  return (
    <TeamBlock>
      <TeamCard>
        <TeamCardActionArea>
          <StyledImg src={`${API_URL}/${word.image}`} alt="" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              {word.word}
            </Typography>
            <Typography variant="body2" color="inherit" component="div">
              <div>Transcription: {word.transcription}</div>
              <div>Meaning: {word.textMeaning}</div>
              <div style={{ paddingBottom: '10px' }}>
                Example: {word.textExample}
              </div>
              {options.translate ? (
                <div>
                  <div>
                    Перевод: <b>{word.wordTranslate}</b>
                  </div>
                  <div>Значение: {word.textMeaningTranslate}</div>
                  <div>Пример: {word.textExampleTranslate}</div>
                </div>
              ) : null}
            </Typography>
          </CardContent>
        </TeamCardActionArea>
        <CardActions>
          <StyledIconButton
            onClick={() => {
              audio.play().then((res) => {
                setTimeout(() => {
                  audio.src = `${API_URL}/${word.audioExample}`;
                  audio.play();
                }, 500);
              });
            }}
          >
            <VolumeUp />
          </StyledIconButton>
          {options.buttons ? (
            <StyleButtons>
              <StyledButton
                onClick={() => {
                  difficultWord(word['_id'], 'hard');
                }}
              >
                Сложное
              </StyledButton>
              <StyledButton
                onClick={() => {
                  difficultWord(word['_id'], 'delete');
                }}
              >
                Удалить
              </StyledButton>
            </StyleButtons>
          ) : null}
        </CardActions>
      </TeamCard>
    </TeamBlock>
  );
};
