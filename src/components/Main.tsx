import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './Header/Header';
import { Footer } from './Footer';
import { TextBook } from './Content/TextBook/TextBook';
import Menu from './Menu/Menu';
import { connect } from 'react-redux';
import { IMainProps } from '../types';
import { Games } from './Content/Games/Games';
import { Sprint } from './Content/Games/Sprint/Sprint';
import Promo from './Promo/Promo';
import { auth } from '../redux/actions/user';

const Main: React.FC<IMainProps> = ({ isModalActive, auth }) => {
  useEffect(() => {
    auth();
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/games/sprint" render={() => <Sprint />} />
        <Route path="/games/savannah" render={() => <div>Savannah</div>} />
        <Route path="/games/audiocall" render={() => <div>audiocall</div>} />
        <Route path="/games/game" render={() => <div>game</div>} />
        <React.Fragment>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Header />
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{
                minHeight: 'calc(100vh - 100px)',
                padding: '0px',
              }}
            >
              <Route exact path="/">
                <Promo />
              </Route>
              <Route path="/textbook">
                <TextBook />
              </Route>
              <Route path="/games">
                <Games />
              </Route>
              <Route path="/statistics">
                <div>Statisctic</div>
              </Route>
            </Grid>
            <Footer />
          </Grid>
        </React.Fragment>
      </Switch>
      {isModalActive && <Menu />}
    </Router>
  );
};
const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
  };
};
export default connect(mapStateToProps, { auth })(Main);
