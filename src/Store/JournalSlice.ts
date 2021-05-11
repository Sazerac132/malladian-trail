import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Fetcher from '../Helpers/Fetcher';

import { Id, JournalStore, LogEntry, Thunk } from '../types';

const defaultState: JournalStore = {
  data: [],
  loading: false,
  error: null
};

const journalSlice = createSlice({
  name: 'journal',
  initialState: defaultState,
  reducers: {
    journalLoading: (
      state: JournalStore,
      action: PayloadAction<{ loading: boolean }>
    ): void => {
      state.loading = action.payload.loading;
    },
    setJournal: (
      state: JournalStore,
      action: PayloadAction<LogEntry[]>
    ): void => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    addJournalItem: (
      state: JournalStore,
      action: PayloadAction<LogEntry>
    ): void => {
      state.data.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    journalActionFailed: (
      state: JournalStore,
      action: PayloadAction<{ error: Error }>
    ): void => {
      state.data = [];
      state.loading = false;
      state.error = action.payload.error;
    },
    removeJournalItem: (
      state: JournalStore,
      action: PayloadAction<{ id: number }>
    ): void => {
      const index = state.data.findIndex(({ id }) => id === action.payload.id);
      state.data.splice(index, 1);
      state.loading = false;
      state.error = null;
    }
  }
});

export default journalSlice;

export const {
  journalLoading,
  setJournal,
  addJournalItem,
  removeJournalItem,
  journalActionFailed
} = journalSlice.actions;

export const getJournalThunk = (): Thunk => async (dispatch) => {
  dispatch(journalLoading({ loading: true }));
  try {
    const { log } = await Fetcher.getLog();
    dispatch(setJournal(log));
  } catch (error) {
    dispatch(journalActionFailed({ error }));
  }
};

export const addJournalItemThunk = (
  charId: Id,
  action: string
): Thunk => async (dispatch, getStore) => {
  dispatch(journalLoading);
  const char = getStore().party.lineup.find(({ id }) => id === charId);
  try {
    const { id } = await Fetcher.postLogItem({ charId: char.id, action });
    dispatch(
      addJournalItem({
        id,
        action,
        char: char.name,
        charId: char.id
      })
    );
  } catch (error) {
    dispatch(journalActionFailed({ error }));
  }
};

export const removeJournalItemThunk = (id: number): Thunk => async (
  dispatch,
  getStore
) => {
  const isGm = getStore().game.data.isGm;
  if (!isGm) return;

  try {
    await Fetcher.removeLogItem(id);
    dispatch(removeJournalItem({ id }));
  } catch (error) {
    dispatch(journalActionFailed(error));
  }
};
