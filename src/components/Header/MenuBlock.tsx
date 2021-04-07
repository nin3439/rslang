import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@material-ui/core';
import { Menu, Equalizer, Games, TextFormat, Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles({
  list: {
    width: 250,
    backgroundColor: 'inherit',
  },
});

const StyledIconButton = styled(IconButton)`
  color: ${({ theme }) => theme.text};
`;

const StyledGrid = styled(Grid)`
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.backgroundImage};
  background-size: cover;
  height: 100vh;
  background-position: center center;
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: ${({ theme }) => theme.text};
`;

const StyledListItemText = styled(ListItemText)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledListItem = styled(ListItem)`
  text-decoration: none;
  transform: rotate(-0.5deg);
`;

export const MenuBlock = () => {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);

  const toggleDrawer = () => (event: React.MouseEvent) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedItemIndex(index);
  };

  return (
    <div>
      <StyledIconButton onClick={toggleDrawer()}>
        <Menu />
      </StyledIconButton>

      <Drawer anchor={'left'} open={isMenuOpen} onClose={toggleDrawer()}>
        <StyledGrid className={classes.list} onClick={toggleDrawer()}>
          <List>
            <Link to="/">
              <StyledListItem
                button
                key={'Главная'}
                selected={selectedItemIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <StyledListItemIcon>
                  <Home />
                </StyledListItemIcon>
                <StyledListItemText primary={'Главная'} />
              </StyledListItem>
            </Link>
            <Link to="/textbook">
              <StyledListItem
                button
                key={'Электронный учебник'}
                selected={selectedItemIndex === 1}
                onClick={(event) => {
                  handleListItemClick(event, 1);
                }}
              >
                <StyledListItemIcon>
                  <TextFormat />
                </StyledListItemIcon>
                <StyledListItemText primary={'Электронный учебник'} />
              </StyledListItem>
            </Link>
            <Link to="/games">
              <StyledListItem
                button
                key={'Мини-игры'}
                selected={selectedItemIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <StyledListItemIcon>
                  <Games />
                </StyledListItemIcon>
                <StyledListItemText primary={'Мини-игры'} />
              </StyledListItem>
            </Link>
            <Link to="/statistics">
              <StyledListItem
                button
                key={'Статистика'}
                selected={selectedItemIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <StyledListItemIcon>
                  <Equalizer />
                </StyledListItemIcon>
                <StyledListItemText primary={'Статистика'} />
              </StyledListItem>
            </Link>
          </List>
        </StyledGrid>
      </Drawer>
    </div>
  );
};
