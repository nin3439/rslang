import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@material-ui/core';

const StyledButton = styled(Button)`
  height 45px;
  width: 110px;
  &.MuiButton-contained {
    color: #f3f5f7;
  }
  transform: scale(1);
  transition: all 0.5s;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
`;

interface IButtonsprops {
  checkRightButton: () => void;
  checkWrongButton: () => void;
  getRandomWord: () => void;
}

export const GameButtons: React.FC<IButtonsprops> = ({
  checkRightButton,
  checkWrongButton,
  getRandomWord,
}) => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      spacing={2}
      style={{ marginBottom: '20px' }}
    >
      <Grid item>
        <StyledButton
          variant="contained"
          style={{ background: '#f13434' }}
          onClick={() => {
            checkWrongButton();
            getRandomWord();
          }}
        >
          Неверно
        </StyledButton>
      </Grid>
      <Grid item>
        <StyledButton
          variant="contained"
          style={{ background: '#11a911' }}
          onClick={() => {
            checkRightButton();
            getRandomWord();
          }}
        >
          Верно
        </StyledButton>
      </Grid>
    </Grid>
  );
};
