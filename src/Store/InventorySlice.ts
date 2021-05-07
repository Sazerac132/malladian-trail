import { Inventory, InventoryStore, Thunk } from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Fetcher from '../Helpers/Fetcher';

const defaultState: InventoryStore = {
  data: { items: [], currency: 0, time: 0 },
  loading: false,
  error: null
};

const specialItems = ['currency', 'time'];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: defaultState,
  reducers: {
    inventoryLoading: (
      state: InventoryStore,
      action: PayloadAction<{ loading: boolean }>
    ): void => {
      state.loading = action.payload.loading;
    },
    setInventory: (
      state: InventoryStore,
      action: PayloadAction<Inventory>
    ): void => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    resetInventory: (): InventoryStore => {
      return defaultState;
    },
    setItemQuantity: (
      state: InventoryStore,
      action: PayloadAction<{ item: string; quantity: number }>
    ): void => {
      const { item, quantity } = action.payload;
      if (specialItems.includes(item)) {
        throw new Error(`Use the specific methods to update ${item}.`);
      }

      if (quantity < 0) {
        throw new Error("Cannot set an item's quantity to a value below 0.");
      }

      const index = state.data.items.findIndex(
        ({ item: itemType }) => itemType === item
      );

      if (index < 0) {
        state.data.items.push({ item, quantity });
        return;
      }
      state.data.items[index].quantity = quantity;
    },
    setCurrency: (
      state: InventoryStore,
      action: PayloadAction<{ quantity: number }>
    ): void => {
      if (action.payload.quantity < 0) {
        throw new Error('Currency cannot go below 0.');
      }
      state.data.currency = action.payload.quantity;
    },
    setTime: (
      state: InventoryStore,
      action: PayloadAction<{ quantity: number }>
    ): void => {
      if (action.payload.quantity < 0) {
        throw new Error('Time cannot go below 0.');
      }
      state.data.time = action.payload.quantity;
    },
    inventoryActionFailed: (
      state: InventoryStore,
      action: PayloadAction<{ error: Error }>
    ): void => {
      state.loading = false;
      state.error = action.payload.error;
    }
  }
});

export default inventorySlice;

export const {
  inventoryLoading,
  resetInventory,
  setInventory,
  setItemQuantity,
  setCurrency,
  setTime,
  inventoryActionFailed
} = inventorySlice.actions;

export const getInventoryThunk = (): Thunk => async (dispatch) => {
  dispatch(inventoryLoading({ loading: true }));
  try {
    const { inventory } = await Fetcher.getInventory();
    dispatch(setInventory(inventory));
  } catch (error) {
    dispatch(inventoryActionFailed({ error }));
  }
};

export const setCurrencyThunk = (
  quantity: number,
  mode: 'change' | 'set'
): Thunk => async (dispatch, getStore) => {
  dispatch(inventoryLoading({ loading: true }));
  const store = getStore();
  try {
    const { currency } = store.inventory.data;
    const newQuantity = mode === 'change' ? currency + quantity : quantity;

    await Fetcher.sendInventoryUpdateRequest({
      item: 'currency',
      quantity: newQuantity
    });
    dispatch(setCurrency({ quantity: newQuantity }));
  } catch (error) {
    dispatch(inventoryActionFailed({ error }));
  }
};

export const setTimeThunk = (
  quantity: number,
  mode: 'change' | 'set'
): Thunk => async (dispatch, getStore) => {
  dispatch(inventoryLoading({ loading: true }));
  const store = getStore();
  try {
    const { time } = store.inventory.data;
    const newQuantity = mode === 'change' ? time + quantity : quantity;

    await Fetcher.sendInventoryUpdateRequest({
      item: 'time',
      quantity: newQuantity
    });

    dispatch(setTime({ quantity: newQuantity }));
  } catch (error) {
    dispatch(inventoryActionFailed({ error }));
  }
};

export const setItemThunk = (
  item: string,
  quantity: number,
  mode: 'change' | 'set'
): Thunk => async (dispatch, getStore) => {
  dispatch(inventoryLoading({ loading: true }));
  const store = getStore();
  try {
    const oldQuantity = store.inventory.data.items.find(
      ({ item: itemInInventory }) => itemInInventory === item
    ).quantity;
    const newQuantity = mode === 'change' ? oldQuantity + quantity : quantity;

    await Fetcher.sendInventoryUpdateRequest({
      item,
      quantity: newQuantity
    });
    dispatch(
      setItemQuantity({
        item,
        quantity: newQuantity
      })
    );
  } catch (error) {
    dispatch(inventoryActionFailed({ error }));
  }
};
