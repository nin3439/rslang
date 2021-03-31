import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Header } from './Header/Header';
import { Footer } from './Footer';
import { TextBook } from './Content/TextBook/TextBook';
import { Menu } from './Menu/Menu';

export const Main: React.FC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  return (
    <Router>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Header showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{
            minHeight: 'calc(100vh - 100px)',
            padding: '0 40px',
          }}
        >
          <Switch>
            <Route exact path="/">
              {/* промо страница */}
              <div>Promo Page</div>
            </Route>
            <Route path="/textbook">
              {/* электронный учебник со словарем (2 вкладки) */}
              <TextBook />
            </Route>
            <Route path="/games">
              {' '}
              <div>Games</div>
              {/* мини-игры */}
            </Route>
            <Route path="/statistics">
              {/* статистика */}
              <div>Statisctic</div>
            </Route>
          </Switch>
        </Grid>
        <Footer />
      </Grid>
      {showUserMenu ? (
        <Menu showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} />
      ) : null}
    </Router>
  );
};
