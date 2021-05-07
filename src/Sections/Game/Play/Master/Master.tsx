import React from 'react';
import { useSelector } from 'react-redux';

import { SystemStore } from '../../../../types';

import './style.scss';
import useInventory from '../../../../Hooks/useInventory';

const Master: React.FC = () => {
  const currency = useSelector(
    (store: SystemStore) => store.inventory.data.currency
  );
  const { changeCurrencyGm } = useInventory();

  const isGm = useSelector((store: SystemStore) => store.game.data.isGm);

  if (!isGm) throw new Error('How are you here?');

  return (
    <div className="master">
      Currency: {currency}
      <button type="button" onClick={() => changeCurrencyGm(1)}>
        hi
      </button>
    </div>
  );
};

export default Master;
