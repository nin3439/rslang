import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GamesMenu } from './GamesMenu';

export const Games = () => {
  return (
    <Switch>
      <Route exact path="/games" render={() => <GamesMenu />} />
      <Route path="/games/savannah" render={() => <div>Savannah</div>} />
      <Route path="/games/sprint" render={() => <div>sprint</div>} />
      <Route path="/games/audiocall" render={() => <div>audiocall</div>} />
      <Route path="/games/game" render={() => <div>game</div>} />
    </Switch>
  );
};
