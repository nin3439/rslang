import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Header from './Header/Header';
import { Footer } from './Footer';
import { TextBook } from './Content/TextBook/TextBook';
import Menu from './Authorization/Authorization';
import { connect } from 'react-redux';
import { IMainProps } from '../types';
import { Games } from './Content/Games/Games';
import Sprint from './Content/Games/Sprint/Sprint';
import Savannah from './Content/Games/Savannah/Savannah';
import Promo from './Promo/Promo';
import { auth } from '../redux/actions/user';
import Audiocall from './Content/Games/Audiocall/Audiocall';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './globalStyles';
import { lightTheme, darkTheme } from './Themes';

const Main: React.FC<IMainProps> = ({ isModalActive, auth }) => {
  const [theme, setTheme] = useState('light');
  const [showNight, setShowNight] = useState(false);
  const updateMode = (showNight: any) => {
    setShowNight(!showNight);
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  useEffect(() => {
    auth();
    // eslint-disable-next-line
  }, []);
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/games/sprint" component={Sprint} />
          <Route path="/games/savannah" component={Savannah} />
          <Route exact path="/games/audiocall" component={Audiocall} />
          {/* <Route path="/games/sprint" component={Sprint} />
          <Route path="/games/savannah" component={Savannah} /> */}
          <Route
            path="/games/audiocall/:link/:groupNumber/:pageNumber"
            component={Audiocall}
          />
          <Route path="/games/game" render={() => <div>game</div>} />
          <React.Fragment>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Header showNight={showNight} updateMode={updateMode} />
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
    </ThemeProvider>
  );
};
const mapStateToProps = (state: any) => {
  return {
    isModalActive: state.controllers.isModalActive,
  };
};
export default connect(mapStateToProps, { auth })(Main);
