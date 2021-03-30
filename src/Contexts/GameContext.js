import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Fetcher from '../Helpers/Fetcher';

import useCharacter from '../Hooks/useCharacter';

const initialStore = {
  gameId: null,
  isGm: false,
  character: null
};

export const GameContext = createContext(initialStore);

const GameContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [gamePw, setGamePw] = useState(null);
  const [isGm, setIsGm] = useState(false);
  const character1 = useCharacter();
  const character2 = useCharacter();

  const createGame = (name, password) => {
    return Fetcher.createGame(name, password)
      .then((gameInfo) => {
        setGameId(gameInfo.code);
      });
  };

  const joinGame = (code, password) => {
    return Fetcher.joinGame(code, password)
      .then((gameInfo) => {
        setGameId(gameInfo.code);
      });
  };

  useEffect(() => {
    Fetcher.currentGame()
      .then(({
        id: retrievedId = null,
        name: retrievedName = '',
        isGm: retrievedIsGm = false,
        characters: retrievedCharacters = []
      }) => {
        setGameId(retrievedId);
        setGameName(retrievedName);
        setIsGm(retrievedIsGm);

        if (retrievedCharacters[0]) character1.importChar(retrievedCharacters[0]);
        if (retrievedCharacters[1]) character2.importChar(retrievedCharacters[1]);
      });
  }, [gameId]);

  const leaveGame = (() => {
    Fetcher.leaveGame()
      .then(() => {
        setGameId(null);
      });
  });

  const store = {
    ...initialStore,
    gameId,
    gameName,
    gamePw,
    saveGamePw: setGamePw,
    createGame,
    joinGame,
    leaveGame,
    isGm,
    character1,
    character2
  };

  return (
    <GameContext.Provider value={store}>
      {children}
    </GameContext.Provider>
  );
};

GameContextProvider.propTypes = {
  children: PropTypes.element
};

export default GameContextProvider;
