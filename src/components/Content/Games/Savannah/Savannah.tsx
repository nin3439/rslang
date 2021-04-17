import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Game from 'components/Content/Games/Savannah/components/Game';
import InitialPage from 'components/Content/Games/commonComponents/InitialPage';
import Results from 'components/Content/Games/commonComponents/Results';
import { GAMES } from 'constants/games';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { IWord } from 'types';
import { changeNameMiniGame } from 'redux/actions/controllerActions';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  background-image: url(https://s3.nat-geo.ru/images/2019/5/16/38fc4adf5b0340628aa9fb94120c7a10.max-2500x1500.jpg);
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface ISavannahProps {
  changeNameGame: (name: string) => void;
}

const Savannah: React.FC<ISavannahProps> = ({ changeNameGame }) => {
  const [isGameStart, setIsGameStart] = useState(false);
  const [level, setLevel] = useState(0);
  const changeFullscreen = useFullScreenHandle();
  const [allRightAnswers, setAllRightAnswers] = useState<(IWord | null)[] | []>(
    []
  );
  const [allWrongAnswers, setAllWrongAnswers] = useState<(IWord | null)[] | []>(
    []
  );
  const [isResultsShow, setIsResultsShow] = useState(false);

  useEffect(() => {
    changeNameGame('savannah');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isGameStart && (allRightAnswers.length || allWrongAnswers.length)) {
      setIsResultsShow(true);
    }
  }, [isGameStart, allRightAnswers, allWrongAnswers]);

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
            setAllRightAnswers={setAllRightAnswers}
            setAllWrongAnswers={setAllWrongAnswers}
          />
        ) : (
          <InitialPage
            setIsGameStart={setIsGameStart}
            level={level}
            setLevel={setLevel}
            changeFullscreen={changeFullscreen}
            game={GAMES[1]}
          />
        )}
        {isResultsShow && (
          <Results
            isResultsShow={isResultsShow}
            setIsResultsShow={setIsResultsShow}
            rightAnswers={allRightAnswers}
            wrongAnswers={allWrongAnswers}
            setRightAnswers={setAllRightAnswers}
            setWrongAnswers={setAllWrongAnswers}
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

export default connect(null, mapDispatchToProps)(Savannah);
