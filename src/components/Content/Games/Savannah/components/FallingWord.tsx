import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { IWord } from 'components/Content/Games/types';

interface StyledProps {
  timeleft: string;
}

const StyledTypography = styled(Typography)`
  @keyframes move {
    from,
    to {
      top: -80px;
    }
    100% {
      top: 50%;
    }
  }
  position: absolute;
  top: -80px;
  animation: move 6s infinite ease-out;
  &.MuiTypography-h6 {
    color: #fff;
    margin: 5px 0;
    @media (max-width: 950px) {
      font-size: 16px;
    }
  }
`;

const GridStyleWrap = styled(Grid)`
  min-height: 300px;
  @media (max-width: 950px) {
    min-height: 350px;
  }
`;

interface IFaillingWordProps {
  randomWord: IWord | null;
  showWord: string;
  timeLeft: number;
}

export const FaillingWord: React.FC<IFaillingWordProps> = ({
  randomWord,
  showWord,
  timeLeft,
}) => {
  return (
    <GridStyleWrap container alignItems="center" justify="center">
      <StyledTypography
        variant="h2"
        style={{ color: '#FFF', display: `${showWord}` }}
      >
        {randomWord?.word}
      </StyledTypography>
    </GridStyleWrap>
  );
};
