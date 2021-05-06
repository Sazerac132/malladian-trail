import React from 'react';

import GameContextProvider from '../../Contexts/GameContext';
import Game from './Game';

const GameWrapper: React.FC = () => {
  return (
    <GameContextProvider>
      <Game />
    </GameContextProvider>
  );
};

export default GameWrapper;
