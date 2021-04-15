import React from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import { VolumeUp } from '@material-ui/icons';
import styled from 'styled-components';
import { playEnglishSound } from 'components/Content/Games/Audiocall/utils';
import { IWord } from 'types';

const StyledButtonAudio = styled(Button)`
  &.MuiButton-root {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: #004a907d;
    &:hover {
      background: #004a907d;
      transition: all 0.5s;
    }
  }
`;

const StyledImage = styled.img`
  width: 300px;
  height: 200px;
  border-radius: 16px;
  border: 3px solid #004a907d;
  margin-right: 30px;
  @media (max-width: 950px) {
    margin: 20px 0;
  }
  @media (max-width: 800px) {
    width: 250px;
    height: 150px;
  }
  @media (max-width: 650px) {
    margin: 0;
  }
`;

const StyledVolumeUp = styled(VolumeUp)`
  &.MuiSvgIcon-root {
    width: 100px;
    height: 100px;
    transition: all 0.5s;
    color: #fff;
    &:hover {
      color: #ffab00;
      transition: all 0.5s;
    }
  }
`;

const StyledVolumeUpIcons = styled(VolumeUp)`
  &.MuiSvgIcon-root {
    width: 30px;
    height: 30px;
    color: #fff;
    margin-right: 15px;
    transform: scale(1);
    transition: transform 0.5s;
    &:hover {
      transform: scale(1.3);
      transition: transform 0.5s;
      cursor: pointer;
    }
  }
`;

const StyledTypography = styled(Typography)`
  &.MuiTypography-h6 {
    color: #fff;
    margin: 5px 0;
    @media (max-width: 950px) {
      font-size: 16px;
    }
  }
`;

const WrapperGrid = styled(Grid)`
  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

const GridStyleWrap = styled(Grid)`
  min-height: 300px;
  @media (max-width: 950px) {
    min-height: 350px;
  }
`;

const StyledGridText = styled(Grid)`
  @media (max-width: 950px) {
    justify-content: center;
  }
`;

const StyledGridWrapperText = styled(Grid)`
  &.MuiGrid-container {
    max-width: 500px;
    @media (max-width: 600px) {
      max-width: 300px;
    }
  }
`;

interface IWordInfoProps {
  randomWord: IWord | null;
  isRightWordShown: boolean;
}

export const WordInfo: React.FC<IWordInfoProps> = ({
  isRightWordShown,
  randomWord,
}) => {
  return (
    <GridStyleWrap container alignItems="center" justify="center">
      {isRightWordShown ? (
        <WrapperGrid
          container
          direction="row"
          alignItems="center"
          justify="center"
        >
          <StyledImage
            src={`https://dream-react-rslang-server.herokuapp.com/${randomWord?.image}`}
            alt={`https://dream-react-rslang-server.herokuapp.com/${randomWord?.word}`}
          />
          <StyledGridWrapperText
            container
            direction="column"
            alignItems="center"
            justify="space-around"
          >
            <StyledGridText
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
            >
              <StyledVolumeUpIcons
                onClick={() => playEnglishSound(randomWord?.audio)}
              />
              <StyledTypography variant="h6">
                {randomWord?.word}{' '}
                <em style={{ color: '#ffab00' }}>
                  {randomWord?.transcription}
                </em>
              </StyledTypography>
            </StyledGridText>
            <StyledGridText
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
              wrap="nowrap"
            >
              <StyledVolumeUpIcons
                onClick={() => playEnglishSound(randomWord?.audioExample)}
              />
              <StyledTypography variant="h6">
                {randomWord?.textExample}{' '}
              </StyledTypography>
            </StyledGridText>
            <StyledGridText
              container
              direction="row"
              alignItems="center"
              justify="flex-start"
            >
              <StyledTypography variant="h6" style={{ marginLeft: '43px' }}>
                {randomWord?.textExampleTranslate}.{' '}
              </StyledTypography>
            </StyledGridText>
          </StyledGridWrapperText>
        </WrapperGrid>
      ) : (
        <Grid container alignItems="center" justify="center">
          <StyledButtonAudio
            variant="contained"
            onClick={() => {
              playEnglishSound(randomWord?.audio);
            }}
          >
            <StyledVolumeUp />
          </StyledButtonAudio>
        </Grid>
      )}
    </GridStyleWrap>
  );
};
