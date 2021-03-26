import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Collapse,
} from '@material-ui/core';
import {
  Menu,
  Equalizer,
  Games,
  TextFormat,
  Home,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import clsx from 'clsx';
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
  const [openCollapse, setOpenCollapse] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(1);

  const handleCollapseClick = () => {
    setOpenCollapse(!openCollapse);
  };

  const toggleDrawer = () => (event: React.MouseEvent) => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedItemIndex(index);
  };

  const list = () => (
    <Grid className={clsx(classes.list)} onClick={toggleDrawer()}>
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
              handleCollapseClick();
              handleListItemClick(event, 1);
            }}
          >
            <ListItemIcon>
              <TextFormat />
            </ListItemIcon>
            <ListItemText primary={'Электронный учебник'} />
            {openCollapse ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText primary="Раздел 1" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Раздел 2" />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Раздел 3" />
              </ListItem>
            </List>
          </Collapse>
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
      </List>
    </Grid>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer()}>
          <Menu />
        </IconButton>

        <SwipeableDrawer
          anchor={'left'}
          open={isMenuOpen}
          onClose={toggleDrawer()}
          onOpen={toggleDrawer()}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};
