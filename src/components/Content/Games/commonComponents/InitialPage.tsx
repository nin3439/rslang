import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  IconButton,
  Select,
  FormControl,
  MenuItem,
  Box,
} from '@material-ui/core';
import { Close, Fullscreen, FullscreenExit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useSound from 'use-sound';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
const count = require('assets/sounds/count.mp3');

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const StyledGrid = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 50px 0 40px;
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
    }
  }
`;

const StyledTypography = styled(Typography)`
  color: #2b4054;
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  transform: scale(1);
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.3);
    transition: transform 0.5s;
  }
`;

const StyledButton = styled(Button)`
  &.MuiButton-root {
    background-color: #2b4054;
    color: #fff;
    transform: scale(1);
    transition: all 0.5s;
    &:hover {
      background-color: #2b4054;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 40vw;
  height: 30vh;
  &.MuiPaper-root {
    background-color: #ffd6cfb0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  transition: height 0.5s;
  @media (max-width: 1500px) {
    width: 40vw;
    height: 40vh;
  }
  @media (max-width: 800px) {
    width: 70vw;
  }
`;

interface FullScreenHandle {
  active: boolean;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
  node: React.MutableRefObject<HTMLDivElement | null>;
}

interface IGame {
  name: string;
  description: string;
  path: string;
}

interface IParams {
  link: string;
  groupNumber: string;
  pageNumber: string;
}

interface IPageProps {
  setIsGameStart: (isGameStart: boolean) => void;
  level: number;
  setLevel: (level: number) => void;
  changeFullscreen: FullScreenHandle;
  game: IGame;
  nameMiniGame: string;
  isAuth: boolean;
}

const InitialPage: React.FC<IPageProps> = ({
  setIsGameStart,
  level,
  setLevel,
  changeFullscreen,
  game,
  nameMiniGame,
  isAuth,
}) => {
  const params: IParams = useParams();
  const changeLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as number);
  };
  console.log(params, isAuth);
  const [playCount] = useSound(count.default, {
    volume: 0.35,
  });

  return (
    <Grid>
      <StyledGrid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <StyledLink to="/games">
          <IconButton>
            <Close fontSize="large" style={{ color: '#fff' }} />
          </IconButton>
        </StyledLink>
        <StyledBox>
          {isAuth && params.link ? null : (
            <FormControl style={{ color: '#fff', marginRight: '20px' }}>
              <Select
                value={level}
                onChange={changeLevel}
                style={{ color: '#fff', width: '110px' }}
              >
                <MenuItem value={0} selected>
                  Уровень 1
                </MenuItem>
                <MenuItem value={1}>Уровень 2</MenuItem>
                <MenuItem value={2}>Уровень 3</MenuItem>
                <MenuItem value={3}>Уровень 4</MenuItem>
                <MenuItem value={4}>Уровень 5</MenuItem>
                <MenuItem value={5}>Уровень 6</MenuItem>
              </Select>
            </FormControl>
          )}
          {!window.screenTop && !window.screenY ? (
            <StyledIconButton onClick={changeFullscreen.enter}>
              <Fullscreen fontSize="large" style={{ color: '#fff' }} />
            </StyledIconButton>
          ) : (
            <StyledIconButton onClick={changeFullscreen.exit}>
              <FullscreenExit fontSize="large" style={{ color: '#fff' }} />{' '}
            </StyledIconButton>
          )}
        </StyledBox>
      </StyledGrid>
      <StyledPaper>
        <StyledTypography style={{ fontWeight: 'bold' }} variant="h3">
          {game.name}{' '}
        </StyledTypography>
        <StyledTypography variant="h5" align="center">
          {game.description}
        </StyledTypography>
        <StyledButton
          autoFocus
          variant="outlined"
          onClick={() => {
            setIsGameStart(true);
            if (nameMiniGame === 'sprint') {
              playCount();
            }
          }}
        >
          Начать
        </StyledButton>
      </StyledPaper>
    </Grid>
  );
};

const mapStateToProps = (state: any) => ({
  nameMiniGame: state.controllers.nameMiniGame,
  isAuth: state.userReducer.isAuth,
});

export default connect(mapStateToProps)(InitialPage);
