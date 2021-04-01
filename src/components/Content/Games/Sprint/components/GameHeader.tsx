import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowBack, VolumeOff, VolumeUp } from '@material-ui/icons';
import styled from 'styled-components';

const StyledIconButton = styled(IconButton)`
  transform: scale(1);
  transition: transform 0.5s;
  width: 50px;
  height: 50px;
  &:hover {
    transform: scale(1.3);
    transition: transform 0.5s;
  }
  &.MuiIconButton-root {
    color: #fff;
  }
`;

const StyledGridHeader = styled(Grid)`
  position: fixed;
  top: 0;
  left: 0;
  padding: 5% 20% 0;
`;

interface IGameHeaderProps {
  isSoundOn: boolean;
  setIsSoundOn: (isSoundOn: boolean) => void;
  setIsGameStart: (isGameStart: boolean) => void;
}

export const GameHeader: React.FC<IGameHeaderProps> = ({
  isSoundOn,
  setIsGameStart,
  setIsSoundOn,
}) => {
  return (
    <StyledGridHeader
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledIconButton onClick={() => setIsGameStart(false)}>
        <ArrowBack />
      </StyledIconButton>
      <StyledIconButton onClick={() => setIsSoundOn(!isSoundOn)}>
        {isSoundOn ? <VolumeUp /> : <VolumeOff />}
      </StyledIconButton>
    </StyledGridHeader>
  );
};
