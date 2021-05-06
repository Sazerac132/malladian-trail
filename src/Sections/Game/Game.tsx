import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { GameContext } from '../../Contexts/GameContext';

import Play from './Play';
import Start from './Initiate/Start';
import Join from './Initiate/Join';

const Game: React.FC = () => {
  const { gameId } = useContext(GameContext);

  return (
    <Switch>
      <Route path="/game/play" component={Play} />
      <Route path="/game/create" component={Start} />
      <Route path="/game/join" component={Join} />
      <Route path="/game/*">
        {gameId ? <Redirect to="/game/join" /> : <Redirect to="/game/create" />}
      </Route>
    </Switch>
  );
};

export default Game;
