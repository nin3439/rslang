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

const useStyles = makeStyles({
  list: {
    width: 250,
    marginTop: 80,
  },
});

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
      <IconButton onClick={toggleDrawer()}>
        <Menu />
      </IconButton>

      <Drawer
        anchor={'left'}
        open={isMenuOpen}
        onClose={toggleDrawer()}
        // onOpen={toggleDrawer()}
      >
        <Grid className={classes.list} onClick={toggleDrawer()}>
          <List>
            <Link to="/">
              <ListItem
                button
                key={'Главная'}
                selected={selectedItemIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary={'Главная'} />
              </ListItem>
            </Link>
            <Link to="/textbook">
              <ListItem
                button
                key={'Электронный учебник'}
                selected={selectedItemIndex === 1}
                onClick={(event) => {
                  handleListItemClick(event, 1);
                }}
              >
                <ListItemIcon>
                  <TextFormat />
                </ListItemIcon>
                <ListItemText primary={'Электронный учебник'} />
              </ListItem>
            </Link>
            <Link to="/games">
              <ListItem
                button
                key={'Мини-игры'}
                selected={selectedItemIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <Games />
                </ListItemIcon>
                <ListItemText primary={'Мини-игры'} />
              </ListItem>
            </Link>
            <Link to="/statistics">
              <ListItem
                button
                key={'Статистика'}
                selected={selectedItemIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Equalizer />
                </ListItemIcon>
                <ListItemText primary={'Статистика'} />
              </ListItem>
            </Link>
            <img
              src="https://rangirangi.com/wp-content/uploads/2017/12/6731c3b8ea4c46570ee4fe0d6e6ddbbf.jpg"
              alt="England"
              style={{ maxWidth: '250px' }}
            />
          </List>
        </Grid>
      </Drawer>
    </div>
  );
};
