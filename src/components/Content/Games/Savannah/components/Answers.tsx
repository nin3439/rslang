import React, { useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import styled from 'styled-components';

interface StyledProps {
  wrong?: string;
  right?: string;
  id: string;
}

const StyledButtonResponse = styled(Button)`
  &.MuiButton-root {
    text-decoration: ${(p: StyledProps) => {
      if (p.id === p.wrong) {
        return 'line-through';
      }
      return 'none';
    }};
    color: ${(p: StyledProps) => {
      if (p.id === p.wrong) {
        return 'red';
      }
      if (p.id === p.right) {
        return 'green';
      }
      return '#fff';
    }};
    font-weight: ${(p: StyledProps) => {
      if (p.id === p.wrong || p.id === p.right) {
        return 'bold';
      }
      return 'normal';
    }};
    min-height: 60px;
    min-width: 200px;
    margin: 10px;
    background: #2b405452;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      text-decoration: ${(p: StyledProps) => {
        if (p.id === p.wrong) {
          return 'line-through';
        }
        return 'none';
      }};
      background: #2b405452;
      transform: scale(1.1);
      transition: transform 0.5s;
    }
    &.MuiButton-outlined {
      border: 3px solid #ffab00;
    }
    @media (max-width: 950px) {
      min-width: 100px;
      min-height: 40px;
    }
  }
`;

const StyledGrid = styled(Grid)`
  padding-bottom: 50px;
`;

interface IAnswersProps {
  handleAnswerClick: (response: string) => void;
  responseOptions: string[];
  rightAnswer: string;
  wrongAnswer: string;
}

export const Answers: React.FC<IAnswersProps> = ({
  handleAnswerClick,
  responseOptions,
  rightAnswer,
  wrongAnswer,
}) => {
  const clickKeysHandler = (event: any) => {
    if ([49, 50, 51, 52].includes(event.keyCode)) {
      handleAnswerClick(responseOptions[event.key - 1]);
    } else return;
  };

  useEffect(() => {
    window.addEventListener('keydown', clickKeysHandler);
    return () => {
      window.removeEventListener('keydown', clickKeysHandler);
    };
  });

  return (
    <>
      <StyledGrid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: '-35vh' }}
      >
        {responseOptions.map((response, index) => {
          return (
            <StyledButtonResponse
              variant="outlined"
              key={response}
              id={response}
              right={rightAnswer}
              wrong={wrongAnswer}
              onClick={() => {
                handleAnswerClick(response);
              }}
            >
              {index + 1} {response}{' '}
            </StyledButtonResponse>
          );
        })}
      </StyledGrid>
    </>
  );
};
