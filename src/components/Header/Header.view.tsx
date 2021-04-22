import React, { useEffect, useMemo } from 'react';
import { Grid, IconButton, Typography, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { MenuBlock } from './MenuBlock';
import styled from 'styled-components';
import { ExitToApp, WbSunny, Brightness2 } from '@material-ui/icons';
import { API_URL } from 'config';
import { HeaderProps } from './Header.types';

const StyledGrid = styled(Grid)`
  padding: 0 28px;
  background: ${({ theme }) => theme.body};
  z-index: 2;
`;

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const StyledMenuBlock = styled(MenuBlock)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: ${({ theme }) => theme.backgroundImage};
  background-size: cover;
  height: 100vh;
  background-position: center center;
`;

const AvatarGrid = styled(Grid)`
  width: 200px;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const HeaderView = ({
  changeModalAuth,
  isAuth,
  userAvatar,
  logout,
  showNight,
  updateMode,
  isPlayAudio,
  audioWord,
  audioMeaning,
  audioExample,
  endAudioWord,
}: HeaderProps) => {
  const audio = useMemo(() => new Audio(), []);
  const playAudio = (src: string): void => {
    audio.src = `${API_URL}/${src}`;
    audio.play();
  };

  const audioPlay = (): void => {
    playAudio(audioWord);
    audio.onended = () => {
      playAudio(audioMeaning);
      audio.onended = () => {
        playAudio(audioExample);
        audio.onended = () => {
          endAudioWord();
        };
      };
    };
  };
  useEffect(() => {
    if (isPlayAudio) {
      audioPlay();
    }
    // eslint-disable-next-line
  }, [isPlayAudio]);
  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
    >
      <StyledMenuBlock />
      <Typography variant="h5">DREAMLANG</Typography>
      <StyledIconButton onClick={() => updateMode(showNight)}>
        {showNight ? <Brightness2 /> : <WbSunny />}
      </StyledIconButton>
      {isAuth ? (
        <AvatarGrid
          container
          direction="row"
          justify="center"
          alignItems="center"
          wrap="nowrap"
        >
          <div>{localStorage.getItem('userName')}</div>
          <Avatar src={userAvatar} style={{ margin: '0 0 0 10px' }} />
          <StyledIconButton
            onClick={() => {
              logout();
            }}
          >
            <ExitToApp />
          </StyledIconButton>
        </AvatarGrid>
      ) : (
        <StyledIconButton onClick={changeModalAuth}>
          <AccountCircle />
        </StyledIconButton>
      )}
    </StyledGrid>
  );
};
