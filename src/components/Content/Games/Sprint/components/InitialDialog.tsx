import React from 'react';
import { Paper, Typography, Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  width: 40vw;
  height: 40vh;
  &.MuiPaper-root {
    background-color: #ffd6cfb0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

interface IDialogProps {
  setIsGameStart: (isGameStart: boolean) => void;
}

export const InitialDialog: React.FC<IDialogProps> = ({ setIsGameStart }) => {
  return (
    <StyledPaper>
      <Typography variant="h3">Спринт</Typography>
      <Typography variant="h5" align="center">
        Выберите соответсвует ли перевод предложенному слову
      </Typography>
      <Button variant="outlined" onClick={() => setIsGameStart(true)}>
        Начать
      </Button>
    </StyledPaper>
  );
};
