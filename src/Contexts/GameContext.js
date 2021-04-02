import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Fetcher from '../Helpers/Fetcher';

import useCharacter from '../Hooks/useCharacter';
import useParty from '../Hooks/useParty';
import useInventory from '../Hooks/useInventory';
import useWebSocket from '../Hooks/useWebSocket';

const initialStore = {
  gameId: null,
  isGm: false,
  character: null
};

export const GameContext = createContext(initialStore);

const GameContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [gameId, setGameId] = useState(null);
  const [gameName, setGameName] = useState(null);
  const [gamePw, setGamePw] = useState(null);
  const [isGm, setIsGm] = useState(false);
  const [incrementor, setIncrementor] = useState(false);
  const { party, updateParty } = useParty(gameId);
  const {
    inventory,
    updateInventory,
    updateGoldLocal,
    updateTimeLocal,
    gmUpdateInventory
  } = useInventory(gameId);

  const {
    socket,
    initiateWebSocket,
    closeWebSocket
  } = useWebSocket();

  if (socket) {
    socket.onmessage = ({ data }) => {
      const {
        instruction,
        message
      } = JSON.parse(data);

      switch (instruction) {
        case 'chat': break;
        case 'update party': updateParty(); break;
        case 'update inventory': updateInventory(); break;
        case 'update gold': updateGoldLocal(message); break;
        case 'update time': updateTimeLocal(message); break;
        default: break;
      }
    };
  }

  const character1 = useCharacter();
  const character2 = useCharacter();

  let numCharacters = 0;
  if (character1.id) numCharacters++;
  if (character2.id) numCharacters++;

  const [numPlayers, setNumPlayers] = useState(numCharacters);

  const forceGameUpdate = () => {
    setIncrementor((b) => !b);
  };

  const createGame = (name, password) => {
    return Fetcher.createGame(name, password)
      .then(() => forceGameUpdate());
  };

  const joinGame = (code, password) => {
    return Fetcher.joinGame(code, password)
      .then(() => forceGameUpdate());
  };

  const leaveGame = (() => {
    Fetcher.leaveGame()
      .then(() => forceGameUpdate());
  });

  useEffect(() => {
    setLoading(true);

    Fetcher.currentGame()
      .then(({
        game: {
          id: retrievedId = null,
          name: retrievedName = '',
          isGm: retrievedIsGm = false
        },
        character: retrievedCharacters
      }) => {
        setGameId(retrievedId);
        setGameName(retrievedName);
        setIsGm(retrievedIsGm);
        setLoading(false);

        let numPlayersAfterLoad = 0;

        if (retrievedCharacters[0]) {
          character1.importChar(retrievedCharacters[0]);
          numPlayersAfterLoad++;
        }

        if (retrievedCharacters[1]) {
          character2.importChar(retrievedCharacters[1]);
          numPlayersAfterLoad++;
        }

        setNumPlayers(numPlayersAfterLoad);
        updateParty();
        updateInventory();

        if (retrievedId) initiateWebSocket();
      });

    return () => closeWebSocket();
  }, [incrementor]);

  const store = {
    ...initialStore,
    loading,
    gameId,
    gameName,
    gamePw,
    saveGamePw: setGamePw,
    createGame,
    joinGame,
    leaveGame,
    isGm,
    character1,
    character2,
    numCharacters,
    numPlayers,
    setNumPlayers,
    party,
    inventory,
    gmUpdateInventory
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
