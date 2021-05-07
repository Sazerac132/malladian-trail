import {
  Character,
  CharacterStore,
  CharIndex,
  NumCharacters,
  Thunk
} from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultState: CharacterStore = {
  characters: [],
  numCharacters: 0
};

const characterSlice = createSlice({
  name: 'characters',
  initialState: defaultState,
  reducers: {
    setCharacter: (
      state: CharacterStore,
      action: PayloadAction<Character & { index: CharIndex }>
    ): void => {
      const { index, ...character } = action.payload;
      state.characters[index] = character;
    },
    setNumberOfCharacters: (
      state: CharacterStore,
      action: PayloadAction<{ quantity: NumCharacters }>
    ): void => {
      state.numCharacters = action.payload.quantity;
    }
  }
});

export default characterSlice;

export const { setCharacter, setNumberOfCharacters } = characterSlice.actions;

export const saveCharacterThunk = (character: Character): Thunk => (
  dispatch
) => {};
