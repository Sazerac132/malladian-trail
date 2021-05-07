import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Play from './Play';
import Start from './Initiate/Start';
import Join from './Initiate/Join';

const Game: React.FC = () => {
  return (
    <Switch>
      <Route path="/game/play" component={Play} />
      <Route path="/game/create" component={Start} />
      <Route path="/game/join" component={Join} />
      <Route path="/game/*">
        <Redirect to="/game/join" />
      </Route>
    </Switch>
  );
};

export default Game;
