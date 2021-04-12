import { VolumeUp } from '@material-ui/icons';
import styled from 'styled-components';
import { API_URL } from '../../../../../config';
import { IWord } from '../../../../../types';
import { IconButton } from '@material-ui/core';
import {
  StyledImg,
  StyledWords,
  StyledPage,
  StyleWord,
  StyleButtons,
  StyledButton,
} from './style';
interface IWordProps {
  word: IWord;
}

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

export const Word = ({ word }: IWordProps) => {
  const audio = new Audio(`${API_URL}/${word.audio}`);
  return (
    <StyledPage>
      <StyledImg src={`${API_URL}/${word.image}`} alt="" />
      <StyledWords>
        <StyleWord>
          <h2>{word.word}</h2>
          <StyledIconButton>
            <VolumeUp
              onClick={() => {
                audio.play();
              }}
            />
          </StyledIconButton>
        </StyleWord>
        <p>{word.textMeaning}</p>
        <p>{word.textExample}</p>
        <p>{word.transcription}</p>
        <p>{word.textExampleTranslate}</p>
        <p>{word.textMeaningTranslate}</p>
        <p>{word.wordTranslate}</p>
        <StyleButtons>
          <StyledButton>Сохранить</StyledButton>
          <StyledButton>Удалить</StyledButton>
        </StyleButtons>
      </StyledWords>
    </StyledPage>
  );
};
