import React from 'react';
import { API_URL } from 'config';
import { VolumeUp } from '@material-ui/icons';
import {
  IOptions,
  IPropsLoadWords,
  IPropsUpdate,
  IStatePage,
  IWord,
} from 'types';
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
import { useDispatch, useSelector } from 'react-redux';
import { playAudioWord } from 'redux/actions/controllerActions';
interface IWordProps {
  word: IWord;
  numberGroup: IPropsLoadWords;
  updateWord: (
    body: IPropsUpdate,
    idWord: string,
    method: 'post' | 'put',
    numberGroup: IPropsLoadWords,
    category: string
  ) => void;
  options: IOptions;
}
export const Word = ({
  word,
  updateWord,
  options,
  numberGroup,
}: IWordProps) => {
  const isCategory = numberGroup.category;
  const deleteWord = (value: boolean) => {
    const body = {
      optional: {
        ...word?.userWord?.optional,
        isDeleted: value,
      },
    };
    const method = word.userWord ? 'put' : 'post';
    updateWord(body, word._id, method, numberGroup, isCategory);
  };
  const difficultWord = (id: string, value: string) => {
    const body = {
      difficulty: value,
    };
    const method = word.userWord ? 'put' : 'post';
    updateWord(body, id, method, numberGroup, isCategory);
  };
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: IStatePage) => state.userReducer);
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
              {options.translate && (
                <div>
                  <div>
                    ??????????????: <b>{word.wordTranslate}</b>
                  </div>
                  <div>????????????????: {word.textMeaningTranslate}</div>
                  <div>????????????: {word.textExampleTranslate}</div>
                </div>
              )}
            </Typography>
          </CardContent>
        </TeamCardActionArea>
        <CardActions>
          <StyledIconButton
            onClick={() => {
              const words = word.audio;
              const meaning = word.audioMeaning;
              const example = word.audioExample;
              dispatch(playAudioWord({ words, meaning, example }));
              // audio.play().then((res) => {
              //   setTimeout(() => {
              //     audio.src = `${API_URL}/${word.audioExample}`;
              //     audio.play();
              //   }, 500);
              // });
            }}
          >
            <VolumeUp />
          </StyledIconButton>
          {!word?.userWord?.optional?.isDeleted &&
            word?.userWord?.difficulty === 'hard' && (
              <StyledButton>
                {isCategory === 'delete' ? (
                  <span>?????????????????? ??????????</span>
                ) : (
                  <span>?????????????? ??????????</span>
                )}
              </StyledButton>
            )}
          {isCategory !== 'learn' && isCategory && (
            <StyledButton
              onClick={() => {
                if (isCategory === 'delete') {
                  deleteWord(false);
                }
                if (isCategory === 'hard') {
                  difficultWord(word['_id'], 'easy');
                }
              }}
            >
              ????????????
            </StyledButton>
          )}
          {isAuth && options.buttons && !isCategory && (
            <StyleButtons>
              {word?.userWord?.difficulty !== 'hard' && (
                <StyledButton
                  onClick={() => {
                    difficultWord(word['_id'], 'hard');
                  }}
                >
                  ??????????????
                </StyledButton>
              )}
              <StyledButton
                onClick={() => {
                  deleteWord(true);
                }}
              >
                ??????????????
              </StyledButton>
            </StyleButtons>
          )}
        </CardActions>
      </TeamCard>
    </TeamBlock>
  );
};
