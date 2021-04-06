import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GAMES } from '../../../../constants/games';
import { InitialPage } from '../commonComponents/InitialPage';
import { Game } from './components/Game';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Results } from '../commonComponents/Results';
import { IWord } from '../types';
import styled from 'styled-components';

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
  const changeFullscreen = useFullScreenHandle();
  const [rightAnswers, setRightAnswers] = useState<(IWord | null)[] | []>([]);
  const [wrongAnswers, setWrongAnswers] = useState<(IWord | null)[] | []>([]);
  const [score, setScore] = useState(0);
  const [isResultsShow, setIsResultsShow] = useState(false);

  useEffect(() => {
    if (!isGameStart && rightAnswers.length) {
      setIsResultsShow(true);
    }
  }, [isGameStart, rightAnswers]);

  return (
    <FullScreen handle={changeFullscreen}>
      <StyledGrid
        container
        direction="column"
        alignItems="center"
        justify="center"
      >
        {isGameStart ? (
          <Game
            setIsGameStart={setIsGameStart}
            level={level}
            setRightAnswers={setRightAnswers}
            setWrongAnswers={setWrongAnswers}
            score={score}
            setScore={setScore}
          />
        ) : (
          <InitialPage
            setIsGameStart={setIsGameStart}
            level={level}
            setLevel={setLevel}
            changeFullscreen={changeFullscreen}
            game={GAMES[0]}
          />
        )}
        {isResultsShow ? (
          <Results
            isResultsShow={isResultsShow}
            setIsResultsShow={setIsResultsShow}
            rightAnswers={rightAnswers}
            wrongAnswers={wrongAnswers}
            setRightAnswers={setRightAnswers}
            setWrongAnswers={setWrongAnswers}
            score={score}
            setScore={setScore}
          />
        ) : (
          ''
        )}
      </StyledGrid>
    </FullScreen>
  );
};
