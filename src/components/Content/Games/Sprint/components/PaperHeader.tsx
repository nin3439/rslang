import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { CheckCircle, Lens } from '@material-ui/icons';
import styled from 'styled-components';

interface IPaperHeaderProps {
  numberConsecutiveRightAnswers: number;
  isСolorHeaderShow: boolean;
  isHeaderYellow: boolean;
}

const StyledGrid = styled(Grid)`
  width: 100%;
  height: 70px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px 4px 0 0;
  box-shadow: ${(p: IPaperHeaderProps) =>
    p.isСolorHeaderShow ? '0 4px 2px -3px #b1b1b1' : 'none'};
  background-color: ${(p: IPaperHeaderProps) =>
    p.isСolorHeaderShow
      ? p.isHeaderYellow
        ? '#fccc00d4'
        : p.numberConsecutiveRightAnswers >= 8 &&
          p.numberConsecutiveRightAnswers <= 11
        ? 'orange'
        : '#ff8da2'
      : 'transparent'};
`;

const StyledTypography = styled(Typography)`
  color: #fff;
`;

const StyledCheckCircle = styled(CheckCircle)`
  color: green;
  &.MuiSvgIcon-root {
    height: 15px;
  }
`;

const StyledLens = styled(Lens)`
  color: gray;
  &.MuiSvgIcon-root {
    height: 15px;
  }
`;

export const PaperHeader: React.FC<IPaperHeaderProps> = ({
  numberConsecutiveRightAnswers,
  isСolorHeaderShow,
  isHeaderYellow,
}) => {
  const showFirstCheckIcon = () => {
    return (
      numberConsecutiveRightAnswers === 1 ||
      numberConsecutiveRightAnswers === 2 ||
      numberConsecutiveRightAnswers === 3 ||
      numberConsecutiveRightAnswers === 5 ||
      numberConsecutiveRightAnswers === 6 ||
      numberConsecutiveRightAnswers === 7 ||
      numberConsecutiveRightAnswers === 9 ||
      numberConsecutiveRightAnswers === 10 ||
      numberConsecutiveRightAnswers === 11
    );
  };

  const showSecondCheckIcon = () => {
    return (
      numberConsecutiveRightAnswers === 2 ||
      numberConsecutiveRightAnswers === 3 ||
      numberConsecutiveRightAnswers === 6 ||
      numberConsecutiveRightAnswers === 7 ||
      numberConsecutiveRightAnswers === 10 ||
      numberConsecutiveRightAnswers === 11
    );
  };

  const showThirdCheckIcon = () => {
    return (
      numberConsecutiveRightAnswers === 3 ||
      numberConsecutiveRightAnswers === 7 ||
      numberConsecutiveRightAnswers === 11
    );
  };

  console.log(numberConsecutiveRightAnswers);

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <StyledGrid
        container
        direction="column"
        alignItems="center"
        justify="center"
        numberConsecutiveRightAnswers={numberConsecutiveRightAnswers}
        isСolorHeaderShow={isСolorHeaderShow}
        isHeaderYellow={isHeaderYellow}
      >
        {numberConsecutiveRightAnswers < 12 ? (
          <Grid>
            {showFirstCheckIcon() ? <StyledCheckCircle /> : <StyledLens />}
            {showSecondCheckIcon() ? <StyledCheckCircle /> : <StyledLens />}
            {showThirdCheckIcon() ? <StyledCheckCircle /> : <StyledLens />}
          </Grid>
        ) : (
          <StyledCheckCircle />
        )}
        {numberConsecutiveRightAnswers >= 4 &&
        numberConsecutiveRightAnswers <= 7 ? (
          <StyledTypography>+20 очков за слово</StyledTypography>
        ) : (
          ''
        )}
        {numberConsecutiveRightAnswers >= 8 &&
        numberConsecutiveRightAnswers <= 11 ? (
          <StyledTypography>+40 очков за слово</StyledTypography>
        ) : (
          ''
        )}
        {numberConsecutiveRightAnswers > 11 ? (
          <StyledTypography>+80 очков за слово</StyledTypography>
        ) : (
          ''
        )}
      </StyledGrid>
      {numberConsecutiveRightAnswers <= 3 ? (
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/826/826949.svg?token=exp=1617375673~hmac=d430b9a90f60875cb6c7d67fdd60cb62"
          alt="The Smallest Deer"
          width="60px"
          height="60px"
        />
      ) : (
        ''
      )}
      {numberConsecutiveRightAnswers >= 4 &&
      numberConsecutiveRightAnswers <= 7 ? (
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/3508/3508856.svg?token=exp=1617377594~hmac=c8d8a8a69f052512c5497c39bb5a8a41"
          alt="Small Deer"
          width="60px"
          height="60px"
        />
      ) : (
        ''
      )}
      {numberConsecutiveRightAnswers >= 8 &&
      numberConsecutiveRightAnswers <= 11 ? (
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/616/616530.svg?token=exp=1617377703~hmac=f3cda8729dfcdcb9405050ee41c4f81f"
          alt="Adult Deer"
          width="60px"
          height="60px"
        />
      ) : (
        ''
      )}
      {numberConsecutiveRightAnswers > 11 ? (
        <img
          src="https://www.flaticon.com/svg/vstatic/svg/667/667633.svg?token=exp=1617377767~hmac=1076b3088164f83edc72e7e0251f2e8a"
          alt="Big Deer"
          width="60px"
          height="60px"
        />
      ) : (
        ''
      )}
    </Grid>
  );
};
