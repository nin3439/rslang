import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { GAMES } from 'constants/games';
import InitialPage from 'components/Content/Games/commonComponents/InitialPage';
import Results from 'components/Content/Games/commonComponents/Results';
import Game from 'components/Content/Games/SpeakIt/components/Game';
import { IWord } from 'components/Content/Games/types';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { changeNameMiniGame } from 'redux/actions/controllerActions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  background-image: url(https://7themes.su/_ph/37/976700070.png);
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface ISpeakItProps {
  changeNameGame: (name: string) => void;
}

const SpeakIt: React.FC<ISpeakItProps> = ({ changeNameGame }) => {
  const [isGameStart, setIsGameStart] = useState(false);
  const [level, setLevel] = useState(0);
  const changeFullscreen = useFullScreenHandle();
  const [rightAnswers, setRightAnswers] = useState<(IWord | null)[] | []>([]);
  const [wrongAnswers, setWrongAnswers] = useState<(IWord | null)[] | []>([]);
  const [score, setScore] = useState(0);
  const [isResultsShow, setIsResultsShow] = useState(false);

  useEffect(() => {
    changeNameGame('speakit');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isGameStart && (rightAnswers.length || wrongAnswers.length)) {
      setIsResultsShow(true);
    }
  }, [isGameStart, rightAnswers, wrongAnswers]);

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
          />
        ) : (
          <InitialPage
            setIsGameStart={setIsGameStart}
            level={level}
            setLevel={setLevel}
            changeFullscreen={changeFullscreen}
            game={GAMES[3]}
          />
        )}
        {isResultsShow && (
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
        )}
      </StyledGrid>
    </FullScreen>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeNameGame(name: string) {
      dispatch(changeNameMiniGame(name));
    },
  };
};

export default connect(null, mapDispatchToProps)(SpeakIt);
