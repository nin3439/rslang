import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowBack, VolumeOff, VolumeUp } from '@material-ui/icons';
import styled from 'styled-components';

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

const StyledGridHeader = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 3% 10% 0;
`;

interface IGameHeaderProps {
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
  setIsGameStart: (isGameStart: boolean) => void;
  setRightAnswers: (rightAnswers: any) => void;
  setWrongAnswers: (wrongAnswers: any) => void;
}

export const GameHeader: React.FC<IGameHeaderProps> = ({
  isSoundOn,
  setIsGameStart,
  setIsSoundOn,
  setRightAnswers,
  setWrongAnswers,
}) => {
  return (
    <StyledGridHeader
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledIconButton
        onClick={() => {
          setIsGameStart(false);
          setRightAnswers([]);
          setWrongAnswers([]);
        }}
      >
        <ArrowBack fontSize="large" style={{ color: '#fff' }} />
      </StyledIconButton>
      <StyledIconButton onClick={() => setIsSoundOn(!isSoundOn)}>
        {isSoundOn ? (
          <VolumeUp fontSize="large" style={{ color: '#fff' }} />
        ) : (
          <VolumeOff fontSize="large" style={{ color: '#fff' }} />
        )}
      </StyledIconButton>
    </StyledGridHeader>
  );
};
