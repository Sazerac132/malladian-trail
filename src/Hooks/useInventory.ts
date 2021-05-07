import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getInventoryThunk,
  resetInventory,
  setCurrency as setCurrencyRedux,
  setTime as setTimeRedux,
  setItemQuantity as setItemQuantityRedux,
  setCurrencyThunk,
  setTimeThunk,
  setItemThunk
} from '../Store/InventorySlice';
import { Inventory, SystemStore } from '../types';

interface UseInventory {
  inventory: Inventory;
  loading: boolean;
  setCurrency: (currency: number) => void;
  setCurrencyGm: (currency: number) => Promise<void>;
  changeCurrencyGm: (currency: number) => Promise<void>;
  setTime: (time: number) => void;
  setTimeGm: (time: number) => Promise<void>;
  changeTimeGm: (time: number) => Promise<void>;
  setItem: (item: string, quantity: number) => void;
  setItemGm: (item: string, quantity: number) => Promise<void>;
  changeItemGm: (item: string, quantity: number) => Promise<void>;
}

const useInventory = (): UseInventory => {
  const { data: inventory, loading } = useSelector(
    (store: SystemStore) => store.inventory
  );
  const isInGame = useSelector((store: SystemStore) => store.game.isInGame);
  const dispatch = useDispatch();

  const setCurrency = (qty: number) => {
    dispatch(setCurrencyRedux({ quantity: qty }));
  };

  const setCurrencyGm = async (qty: number) => {
    await dispatch(setCurrencyThunk(qty, 'set'));
  };

  const changeCurrencyGm = async (qty: number) => {
    await dispatch(setCurrencyThunk(qty, 'change'));
  };

  const setTime = (qty: number) => {
    dispatch(setTimeRedux({ quantity: qty }));
  };

  const setTimeGm = async (qty: number) => {
    await dispatch(setTimeThunk(qty, 'set'));
  };

  const changeTimeGm = async (qty: number) => {
    await dispatch(setTimeThunk(qty, 'change'));
  };

  const setItem = (item: string, qty: number) => {
    dispatch(setItemQuantityRedux({ item, quantity: qty }));
  };

  const setItemGm = async (item: string, qty: number) => {
    await dispatch(setItemThunk(item, qty, 'set'));
  };

  const changeItemGm = async (item: string, qty: number) => {
    await dispatch(setItemThunk(item, qty, 'change'));
  };

  useEffect(() => {
    if (!isInGame) {
      dispatch(resetInventory());
      return;
    }

    dispatch(getInventoryThunk());
  }, [isInGame]);

  return {
    inventory,
    loading,
    setCurrency,
    setCurrencyGm,
    changeCurrencyGm,
    setTime,
    setTimeGm,
    changeTimeGm,
    setItem,
    setItemGm,
    changeItemGm
  };
};

export default useInventory;
