import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
} from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';
import { IWord } from '../../Games/types';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: 300px;
  overflow: auto;
`;

interface IResultsProps {
  isResultsShow: boolean;
  setIsResultsShow: (isResultsShow: boolean) => void;
  wrongAnswers: (IWord | null)[];
  rightAnswers: (IWord | null)[];
  setWrongAnswers: (wrongAnswers: (IWord | null)[]) => void;
  setRightAnswers: (rightAnswers: (IWord | null)[]) => void;
  score: number;
  setScore: (score: number) => void;
}

export const Results: React.FC<IResultsProps> = ({
  isResultsShow,
  setIsResultsShow,
  score,
  setScore,
  wrongAnswers,
  rightAnswers,
  setRightAnswers,
  setWrongAnswers,
}) => {
  const playEnglishWord = (name: string | undefined) => {
    const audio = new Audio();
    audio.src = `https://dream-react-rslang-server.herokuapp.com/${name}`;
    audio.play();
  };

  return (
    <Dialog onClose={() => setIsResultsShow(false)} open={isResultsShow}>
      <DialogContent dividers>
        <Grid container direction="column" alignItems="center" justify="center">
          <Typography variant="h5">Результаты</Typography>
          <Typography gutterBottom>Вы набрали {score} очков.</Typography>
        </Grid>
        <StyledGrid>
          <Typography gutterBottom>Я знаю {rightAnswers.length}</Typography>
          {rightAnswers.map((rightAnswer) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <VolumeUp onClick={() => playEnglishWord(rightAnswer?.audio)} />
                <Typography>
                  {rightAnswer?.word} - {rightAnswer?.wordTranslate[0]}{' '}
                </Typography>
              </Grid>
            );
          })}
          <Typography gutterBottom>Я не знаю {wrongAnswers.length}</Typography>
          {wrongAnswers.map((wrongAnswer) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="flex-start"
              >
                <VolumeUp onClick={() => playEnglishWord(wrongAnswer?.audio)} />
                <Typography>
                  {wrongAnswer?.word} - {wrongAnswer?.wordTranslate[0]}{' '}
                </Typography>
              </Grid>
            );
          })}
        </StyledGrid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            setIsResultsShow(false);
            setScore(0);
            setRightAnswers([]);
            setWrongAnswers([]);
          }}
        >
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};
