import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { GameHeader } from '../Common/GameHeader';
import styled from 'styled-components';
import { InitialDialog } from './components/InitialDialog';
import { Game } from './components/Game';

const StyledGrid = styled(Grid)`
  background-image: url(https://storge.pic2.me/cm/3200x1800/734/580bbcdb34b56.jpg);
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Sprint = () => {
  const [isGameStart, setIsGameStart] = useState(false);

  return (
    <StyledGrid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      <GameHeader />
      {isGameStart ? (
        <Game setIsGameStart={setIsGameStart} />
      ) : (
        <InitialDialog setIsGameStart={setIsGameStart} />
      )}
    </StyledGrid>
  );
};
