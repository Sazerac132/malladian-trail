import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import Home from '../Home';
import Game from '../Game';
import About from '../About';
import Rules from '../Rules';

import './style.scss';
import useWebSocket from '../../Hooks/useWebSocket';
import { SystemStore } from '../../types';
import { currentGameThunk } from '../../Store/GameSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isInGame = useSelector((store: SystemStore) => store.game.isInGame);
  const { initiateWebSocket, closeWebSocket } = useWebSocket();

  useEffect(() => {
    if (isInGame) initiateWebSocket();
    return () => closeWebSocket();
  }, [isInGame]);

  useEffect(() => {
    dispatch(currentGameThunk());
  }, []);

  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className="bodyWrapper">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/about" component={About} />
            <Route path="/rules" component={Rules} />
            <Route path="/faq" component={Home} />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
