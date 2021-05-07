import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import gameSlice from './GameSlice';
import characterSlice from './CharacterSlice';
import journalSlice from './JournalSlice';
import inventorySlice from './InventorySlice';
import partySlice from './PartySlice';
import navigationSlice from './NavigationSlice';

const store = configureStore({
  reducer: combineReducers({
    [gameSlice.name]: gameSlice.reducer,
    [characterSlice.name]: characterSlice.reducer,
    [journalSlice.name]: journalSlice.reducer,
    [inventorySlice.name]: inventorySlice.reducer,
    [partySlice.name]: partySlice.reducer,
    [navigationSlice.name]: navigationSlice.reducer
  }),
  devTools: true
});

export default store;
