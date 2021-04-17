import React from 'react';
import { Typography, Grid, IconButton, Tooltip } from '@material-ui/core';
import { CheckCircle, Lens, VolumeUp, MusicNote } from '@material-ui/icons';
import { deer1, deer2, deer3, deer4 } from 'assets/icons';
import {
  getHeaderColor,
  showFirstCheckIcon,
  showSecondCheckIcon,
  showThirdCheckIcon,
} from 'components/Content/Games/Sprint/utils';
import useSound from 'use-sound';
import styled from 'styled-components';
import { IWord } from 'types';
const inRange = require('lodash.inrange');

interface StyledProps {
  number: string;
}

const StyledGrid = styled(Grid)`
  position: relative;
  width: 100%;
  height: 70px;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 4px 4px 0 0;
  box-shadow: ${(p: StyledProps) => {
    const numberRightAnswers = +p.number > 3;
    if (numberRightAnswers) {
      return '0 4px 2px -3px #b1b1b1';
    }
    return 'none';
  }};
  background-color: ${(p: StyledProps) => {
    return getHeaderColor(p.number);
  }};
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

const StyledTooltip = styled((props) => (
  <Tooltip
    classes={{ popper: props.className, tooltip: 'tooltip' }}
    {...props}
  />
))`
  & .tooltip {
    background-color: #28203f;
    color: #fff;
    width: 120px;
    text-align: center;
    margin-top: 0;
  }
`;

const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root {
    position: absolute;
    top: 10px;
  }
  &.MuiIconButton-root {
    color: gray;
  }
`;

interface IPaperHeaderProps {
  numberConsecutiveRightAnswers: number;
  randomWord: IWord | null;
}

export const PaperHeader: React.FC<IPaperHeaderProps> = ({
  numberConsecutiveRightAnswers,
  randomWord,
}) => {
  const [playEnglishWord] = useSound(
    `https://dream-react-rslang-server.herokuapp.com/${randomWord?.audio}`
  );

  const [playEnglishAudioExample] = useSound(
    `https://dream-react-rslang-server.herokuapp.com/${randomWord?.audioExample}`
  );

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <StyledGrid
        container
        direction="column"
        alignItems="center"
        justify="center"
        number={numberConsecutiveRightAnswers.toString()}
      >
        <StyledTooltip title="Прослушать произношение слова">
          <StyledIconButton
            onClick={() => playEnglishWord()}
            style={{ right: '10px' }}
          >
            <VolumeUp fontSize="small" />
          </StyledIconButton>
        </StyledTooltip>
        <StyledTooltip title="Прослушать пример произношения предложения со словом">
          <StyledIconButton
            onClick={() => playEnglishAudioExample()}
            style={{ left: '10px' }}
          >
            <MusicNote fontSize="small" />
          </StyledIconButton>
        </StyledTooltip>
        {inRange(numberConsecutiveRightAnswers, 12) ? (
          <Grid>
            {showFirstCheckIcon(numberConsecutiveRightAnswers) ? (
              <StyledCheckCircle />
            ) : (
              <StyledLens />
            )}
            {showSecondCheckIcon(numberConsecutiveRightAnswers) ? (
              <StyledCheckCircle />
            ) : (
              <StyledLens />
            )}
            {showThirdCheckIcon(numberConsecutiveRightAnswers) ? (
              <StyledCheckCircle />
            ) : (
              <StyledLens />
            )}
          </Grid>
        ) : (
          <StyledCheckCircle />
        )}
        {inRange(numberConsecutiveRightAnswers, 4, 8) && (
          <StyledTypography>+20 очков за слово</StyledTypography>
        )}
        {inRange(numberConsecutiveRightAnswers, 8, 12) && (
          <StyledTypography>+40 очков за слово</StyledTypography>
        )}
        {numberConsecutiveRightAnswers > 11 && (
          <StyledTypography>+80 очков за слово</StyledTypography>
        )}
      </StyledGrid>
      {inRange(numberConsecutiveRightAnswers, 4) && (
        <img src={deer1} alt="The Smallest Deer" width="60px" height="60px" />
      )}
      {inRange(numberConsecutiveRightAnswers, 4, 8) && (
        <img
          src={deer2}
          alt="Small Deer"
          width="60px"
          height="60px"
          style={{ marginLeft: '10px' }}
        />
      )}
      {inRange(numberConsecutiveRightAnswers, 8, 12) && (
        <img src={deer3} alt="Adult Deer" width="60px" height="60px" />
      )}
      {numberConsecutiveRightAnswers > 11 && (
        <img src={deer4} alt="Big Deer" width="60px" height="60px" />
      )}
    </Grid>
  );
};
