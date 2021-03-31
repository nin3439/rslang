import React from 'react';
import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Groups } from './groups/groups';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Page } from './page/page';
import { Link } from 'react-router-dom';
import { Dictionary } from './dictionary/Dictionary';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const TextBook = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { path, url } = useRouteMatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Электронный учебник" component={Link} to="/textbook" />
          <Tab label="Словарь" component={Link} to={`${path}/dictionary`} />
        </Tabs>
      </AppBar>

      <Switch>
        <Route path={`${path}/dictionary`}>
          <Dictionary />
        </Route>
        <Route path={`${path}/group/:numberGroup/page/:numberPage`}>
          <Page />
        </Route>
        <Route exact path="/textbook">
          <Groups />
        </Route>
      </Switch>
    </div>
  );
};
