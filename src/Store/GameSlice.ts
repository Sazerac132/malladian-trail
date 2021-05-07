import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import {
  CharIndex,
  CreateGameCredentials,
  Game,
  GameMessages,
  GameStore,
  JoinGameCredentials,
  Thunk
} from '../types';
import Fetcher from '../Helpers/Fetcher';
import { setCharacter } from './CharacterSlice';

const defaultState: GameStore = {
  data: {},
  isInGame: null,
  message: null,
  loading: false
};

const gameSlice = createSlice({
  name: 'game',
  initialState: defaultState,
  reducers: {
    gameLoading: (
      state: GameStore,
      action: PayloadAction<{ loading: boolean }>
    ): void => {
      state.loading = action.payload.loading;
    },
    joinGame: (state: GameStore, action: PayloadAction<Game>): void => {
      state.data = action.payload;
      state.isInGame = true;
      state.message = null;
      state.loading = false;
    },
    createGameFailed: (state: GameStore): void => {
      state.data = null;
      state.isInGame = false;
      state.message = GameMessages.CreateFailed;
      state.loading = false;
    },
    joinGameFailed: (state: GameStore): void => {
      state.data = null;
      state.isInGame = false;
      state.message = GameMessages.JoinFailed;
      state.loading = false;
    },
    leaveGame: (state: GameStore): void => {
      state.data = null;
      state.isInGame = false;
      state.message = GameMessages.LeaveSuccess;
      state.loading = false;
    }
  }
});

export default gameSlice;

export const {
  gameLoading,
  joinGame,
  createGameFailed,
  joinGameFailed,
  leaveGame
} = gameSlice.actions;

export const createGameThunk = (
  credentials: CreateGameCredentials
): Thunk => async (dispatch) => {
  const { name, codeword } = credentials;
  dispatch(gameLoading({ loading: true }));

  try {
    const { code: id } = await Fetcher.createGame(name, codeword);

    dispatch(
      joinGame({
        id,
        codeword,
        isGm: true,
        name
      })
    );
  } catch (err) {
    dispatch(createGameFailed());
  }
};

export const joinGameThunk = (
  credentials: JoinGameCredentials
): Thunk => async (dispatch) => {
  const { gameCode, codeword } = credentials;

  dispatch(gameLoading({ loading: true }));

  try {
    await Fetcher.joinGame(gameCode, codeword);
    dispatch(currentGameThunk());
  } catch (err) {
    dispatch(joinGameFailed());
  }
};

export const currentGameThunk = (): Thunk => async (dispatch) => {
  dispatch(gameLoading({ loading: true }));
  const { game, characters } = await Fetcher.currentGame();

  if (!game.id) {
    dispatch(leaveGame());
    return;
  }

  dispatch(joinGame(game));

  characters.slice(0, 2).forEach((character, index: CharIndex) => {
    dispatch(
      setCharacter({
        ...character,
        index
      })
    );
  });
};

export const leaveGameThunk = (): Thunk => async (dispatch) => {
  dispatch(gameLoading({ loading: true }));
  await Fetcher.leaveGame();
  dispatch(leaveGame());
};
