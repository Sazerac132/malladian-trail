import { MapSection, NavigationStore, Section } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const defaultState: NavigationStore = {
  section: 'char',
  mapSection: 'world'
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: defaultState,
  reducers: {
    resetSections: (state: NavigationStore): void => {
      state.section = defaultState.section;
      state.mapSection = defaultState.mapSection;
    },
    navigate: (
      state: NavigationStore,
      action: PayloadAction<{ section: Section }>
    ): void => {
      state.section = action.payload.section;
    },
    changeMap: (
      state: NavigationStore,
      action: PayloadAction<{ mapSection: MapSection }>
    ): void => {
      state.mapSection = action.payload.mapSection;
    }
  }
});

export default navigationSlice;

export const { resetSections, navigate, changeMap } = navigationSlice.actions;
