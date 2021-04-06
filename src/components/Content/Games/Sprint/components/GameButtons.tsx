import React, { useEffect } from 'react';
import { Button, Grid } from '@material-ui/core';
import { TrendingFlat } from '@material-ui/icons';
import styled from 'styled-components';

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
  const arrowsKeysHandler = (event: any) => {
    if (event.keyCode === 37) {
      checkWrongButton();
      getRandomWord();
    } else if (event.keyCode === 39) {
      checkRightButton();
      getRandomWord();
    } else return;
  };

  useEffect(() => {
    window.addEventListener('keydown', arrowsKeysHandler);
    return () => {
      window.removeEventListener('keydown', arrowsKeysHandler);
    };
  });

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ marginBottom: '20px' }}
    >
      <Grid container alignItems="center" justify="center" spacing={4}>
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
      <Grid
        container
        alignItems="center"
        justify="space-around"
        style={{ padding: '0 55px' }}
      >
        <TrendingFlat color="action" style={{ transform: 'rotate(0.5turn)' }} />
        <TrendingFlat color="action" />
      </Grid>
    </Grid>
  );
};
