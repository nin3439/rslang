import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledTypographyTimer = styled(Typography)`
  width: 55px;
  @media (max-width: 950px) {
    width: 35px;
    font-size: 26px;
  }
`;

const StyledTimerBox = styled(Box)`
  color: #fff;
  border: 5px solid #fff;
  border-radius: 50%;
  padding: 10px;
  position: absolute;
  top: 50%;
  right: 20%;
  @media (max-width: 950px) {
    top: 14%;
  }
`;

interface ITimerProps {
  isWrongTranslationAdded: boolean;
  setIsGameStart: (isGameStart: boolean) => void;
}

export const Timer: React.FC<ITimerProps> = ({
  isWrongTranslationAdded,
  setIsGameStart,
}) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (isWrongTranslationAdded) {
      if (timer) {
        let sec = setTimeout(() => {
          setTimer((prev: number) => prev - 1);
        }, 1000);
        return function cleanUp() {
          clearTimeout(sec);
        };
      } else {
        setIsGameStart(false);
      }
    }
    // eslint-disable-next-line
  }, [timer, isWrongTranslationAdded]);

  return (
    <StyledTimerBox>
      <StyledTypographyTimer variant="h3" align="center">
        {timer}{' '}
      </StyledTypographyTimer>
    </StyledTimerBox>
  );
};
