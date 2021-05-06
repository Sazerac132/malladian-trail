import React, { createContext, useState, useEffect } from 'react';

import Fetcher, {
  JoinGameResponse,
  LogUpdatePayload
} from '../Helpers/Fetcher';
import Logger from '../Helpers/Logger';

import useCharacter, { UseCharacter } from '../Hooks/useCharacter';
import useParty from '../Hooks/useParty';
import useInventory from '../Hooks/useInventory';
import useLog from '../Hooks/useLog';
import useWebSocket from '../Hooks/useWebSocket';
import {
  Id,
  Character,
  Party,
  Name,
  Codeword,
  LogEntry,
  Inventory
} from '../types';

interface GameStore {
  gameId: Id;
  isGm: boolean | null;
  character: Character | null;
  loading: boolean;
  gameName: Name;
  gamePw: Codeword;
  saveGamePw: (pw: string) => void;
  createGame: (name: string, password: string) => Promise<void>;
  joinGame: (code: string | number, password: string) => Promise<void>;
  leaveGame: () => Promise<void>;
  character1: UseCharacter;
  character2: UseCharacter;
  numCharacters: number;
  numPlayers: number;
  setNumPlayers: (players: number) => void;
  party: Party;
  inventory: Inventory;
  log: LogEntry[];
  addLogItem: (item: any, party: Party) => void;
  postLogItem: (payload: LogUpdatePayload) => void;
  removeLogItem: (id: number) => void;
  gmUpdateInventory: (item: string, quantity: number) => Promise<unknown>;
}

const initialStore: Partial<GameStore> = {
  gameId: null,
  isGm: false,
  character: null
};

export const GameContext = createContext<Partial<GameStore>>(initialStore);

const GameContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [gameId, setGameId] = useState<Id>(null);
  const [gameName, setGameName] = useState<Name>(null);
  const [gamePw, setGamePw] = useState<string | null>(null);
  const [isGm, setIsGm] = useState<boolean>(false);
  const [incrementor, setIncrementor] = useState<boolean>(false);
  const { party, updateParty } = useParty(gameId);
  const {
    inventory,
    updateInventory,
    updateGoldLocal,
    updateTimeLocal,
    gmUpdateInventory
  } = useInventory(gameId);

  const {
    log,
    addLogItem,
    postLogItem,
    removeLogItem,
    removeLogItemLocal
  } = useLog(gameId);

  const { socket, initiateWebSocket, closeWebSocket } = useWebSocket();

  if (socket) {
    socket.onmessage = ({ data }: { data: string }) => {
      const { instruction, message } = JSON.parse(data);

      switch (instruction) {
        case 'chat':
          break;
        case 'update party':
          updateParty();
          break;
        case 'update inventory':
          updateInventory();
          break;
        case 'update gold':
          updateGoldLocal(message);
          break;
        case 'update time':
          updateTimeLocal(message);
          break;
        case 'add event':
          addLogItem(message, party);
          break;
        case 'delete event':
          removeLogItemLocal(parseInt(message, 10));
          break;
        default:
          Logger.log(`Unhandled ws message: ${instruction}`);
          break;
      }
    };
  }

  const character1 = useCharacter();
  const character2 = useCharacter();

  let numCharacters = 0;
  if (character1.id) numCharacters++;
  if (character2.id) numCharacters++;

  const [numPlayers, setNumPlayers] = useState<number>(numCharacters);

  const forceGameUpdate = () => {
    setIncrementor((b) => !b);
  };

  const createGame = async (name: string, password: string) => {
    await Fetcher.createGame(name, password);
    forceGameUpdate();
  };

  const joinGame = async (code: string | number, password: string) => {
    await Fetcher.joinGame(code, password);
    forceGameUpdate();
  };

  const leaveGame = async () => {
    await Fetcher.leaveGame();
    forceGameUpdate();
  };

  useEffect(() => {
    setLoading(true);

    Fetcher.currentGame().then(
      ({
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
      }
    );

    return () => closeWebSocket();
  }, [incrementor]);

  const store: Partial<GameStore> = {
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
    log,
    addLogItem,
    postLogItem,
    removeLogItem,
    gmUpdateInventory
  };

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
