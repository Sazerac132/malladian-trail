import { useState, useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';
import { Id, Inventory } from '../types';

interface UseInventory {
  inventory: Inventory;
  updateInventory: () => void;
  updateGoldLocal: (currency: number) => void;
  updateTimeLocal: (time: number) => void;
  gmUpdateInventory: (item: string, quantity: number) => Promise<unknown>;
}

const useInventory = (gameId: Id): UseInventory => {
  const [inventory, setInventory] = useState<Inventory>({
    time: 0,
    currency: 0,
    items: []
  });
  const [loading, setLoading] = useState(false);
  const [incrementor, setIncrementor] = useState(false);

  const updateInventory = () => {
    setIncrementor((b) => !b);
  };

  const gmUpdateInventory = async (item: string, quantity: number) => {
    return Fetcher.sendInventoryUpdateRequest({ item, quantity });
  };

  const updateGoldLocal = (currency: number) => {
    setInventory((inv) => ({ ...inv, currency }));
  };

  const updateTimeLocal = (time: number) => {
    setInventory((inv) => ({ ...inv, time }));
  };

  useEffect(() => {
    if (!gameId && !loading) {
      setInventory({ currency: 0, time: 0, items: [] });
      return;
    }

    setLoading(true);

    Fetcher.getInventory().then(({ inventory: retrievedInventory }) => {
      setLoading(false);
      setInventory(retrievedInventory);
    });
  }, [incrementor]);

  return {
    inventory,
    updateInventory,
    updateGoldLocal,
    updateTimeLocal,
    gmUpdateInventory
  };
};

export default useInventory;
