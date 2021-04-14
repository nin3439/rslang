import { VolumeUp } from '@material-ui/icons';
import { API_URL } from 'config';
import { IWord } from 'types';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import {
  StyledImg,
  StyleButtons,
  StyledButton,
  TeamBlock,
  TeamCard,
  TeamCardActionArea,
  StyledIconButton,
} from './style';

interface IWordProps {
  word: IWord;
  options: {
    translate: boolean;
    buttons: boolean;
  };
}

export const Word = ({ word, options }: IWordProps) => {
  const audio = new Audio(`${API_URL}/${word.audio}`);
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
              audio.play();
            }}
          >
            <VolumeUp />
          </StyledIconButton>
          {options.buttons ? (
            <StyleButtons>
              <StyledButton>Сохранить</StyledButton>
              <StyledButton>Удалить</StyledButton>
            </StyleButtons>
          ) : null}
        </CardActions>
      </TeamCard>
    </TeamBlock>
  );
};
