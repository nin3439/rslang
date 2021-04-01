import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { InitialPage } from './components/InitialPage';
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
  const [level, setLevel] = useState(0);

  return (
    <StyledGrid
      container
      direction="column"
      alignItems="center"
      justify="center"
    >
      {isGameStart ? (
        <Game setIsGameStart={setIsGameStart} level={level} />
      ) : (
        <InitialPage
          setIsGameStart={setIsGameStart}
          level={level}
          setLevel={setLevel}
        />
      )}
    </StyledGrid>
  );
};
