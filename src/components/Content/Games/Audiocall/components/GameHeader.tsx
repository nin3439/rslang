import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styled from 'styled-components';
import { IWord } from 'components/Content/Games/types';

const StyledGridHeader = styled(Grid)`
  padding: 30px 50px;
  margin-bottom: -100px;
  @media (max-width: 700px) {
    padding: 10px;
    margin-bottom: 0;
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiIconButton-root {
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
    }
    @media (max-width: 700px) {
      min-width: 100px;
    }
  }
`;

interface IGameHeaderProps {
  setIsGameStart: (isGameStart: boolean) => void;
  setAllRightAnswers: (allRightAnswers: IWord[]) => void;
}

export const GameHeader: React.FC<IGameHeaderProps> = ({
  setIsGameStart,
  setAllRightAnswers,
}) => {
  return (
    <StyledGridHeader container alignItems="center" justify="flex-start">
      <StyledIconButton
        onClick={() => {
          setIsGameStart(false);
          setAllRightAnswers([]);
        }}
      >
        <ArrowBack fontSize="large" style={{ color: '#fff' }} />
      </StyledIconButton>
    </StyledGridHeader>
  );
};
