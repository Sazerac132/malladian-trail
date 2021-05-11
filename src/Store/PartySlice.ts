import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Fetcher from '../Helpers/Fetcher';

import { Party, PartyStore, Thunk } from '../types';

const defaultState: PartyStore = {
  lineup: [],
  inactive: [],
  loading: false,
  error: null
};

const partySlice = createSlice({
  name: 'party',
  initialState: defaultState,
  reducers: {
    partyLoading: (
      state: PartyStore,
      action: PayloadAction<{ loading: boolean }>
    ): void => {
      state.loading = action.payload.loading;
    },
    setParty: (state: PartyStore, action: PayloadAction<Party>): void => {
      const active: Party = [];
      const retired: Party = [];

      action.payload.forEach((c) => {
        if (c.retired) retired.push(c);
        else active.push(c);
      });

      state.lineup = active;
      state.inactive = retired;
      state.loading = false;
      state.error = null;
    },
    partyActionFailed: (
      state: PartyStore,
      action: PayloadAction<{ error: Error }>
    ): void => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
});

export default partySlice;

export const { partyLoading, setParty, partyActionFailed } = partySlice.actions;

export const getPartyThunk = (): Thunk => async (dispatch) => {
  dispatch(partyLoading({ loading: true }));
  try {
    const { party } = await Fetcher.getParty();
    dispatch(setParty(party));
  } catch (error) {
    dispatch(partyActionFailed({ error }));
  }
};
