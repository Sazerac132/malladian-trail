import { useState, useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';

const useInventory = (gameId) => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incrementor, setIncrementor] = useState(false);

  const updateInventory = () => {
    setIncrementor((b) => !b);
  };

  const gmUpdateInventory = (item, quantity) => {
    return Fetcher.sendInventoryUpdateRequest({ item, quantity });
  };

  const updateGoldLocal = (currency) => {
    setInventory((inv) => ({ ...inv, currency }));
  };

  const updateTimeLocal = (time) => {
    setInventory((inv) => ({ ...inv, time }));
  };

  useEffect(() => {
    if (!gameId && !loading) {
      setInventory([]);
      return;
    }

    setLoading(true);

    Fetcher.getInventory()
      .then(({ inventory: retrievedInventory }) => {
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
