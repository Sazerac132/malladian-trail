import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Fetcher from '../Helpers/Fetcher';

import { Character, CharacterStore, CharIndex, Thunk } from '../types';

const defaultState: CharacterStore = {
  characters: [],
  error: null,
  loading: [false, false]
};

const characterSlice = createSlice({
  name: 'characters',
  initialState: defaultState,
  reducers: {
    characterLoading: (
      state: CharacterStore,
      action: PayloadAction<{ loading: boolean; index: CharIndex }>
    ): void => {
      const { loading, index } = action.payload;
      state.loading[index] = loading;
    },
    setCharacter: (
      state: CharacterStore,
      action: PayloadAction<{ character: Character; index: CharIndex }>
    ): void => {
      const { index, character } = action.payload;
      state.characters[index] = character;
      state.loading[index] = false;
    },
    characterActionFailed: (
      state: CharacterStore,
      action: PayloadAction<{ error: Error }>
    ): void => {
      state.error = action.payload.error;
    },
    resetCharacters: (state: CharacterStore): void => {
      state.characters = [];
      state.loading = [false, false];
    }
  }
});

export default characterSlice;

export const {
  characterLoading,
  setCharacter,
  characterActionFailed,
  resetCharacters
} = characterSlice.actions;

export const saveCharacterThunk = (
  character: Character,
  index: CharIndex
): Thunk => async (dispatch) => {
  dispatch(characterLoading({ loading: true, index }));
  try {
    const { id } = await Fetcher.saveChar(character, index, character.id);
    dispatch(
      setCharacter({
        character: { id, ...character },
        index
      })
    );
  } catch (error) {
    dispatch(characterActionFailed({ error }));
  }
};
