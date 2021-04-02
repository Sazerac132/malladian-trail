import React, { useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';

import Fetcher from '../../../../Helpers/Fetcher';

import './style.scss';

const Master = () => {
  const {
    isGm,
    inventory: {
      time, items, currency
    },
    gmUpdateInventory
  } = useContext(GameContext);

  if (!isGm) throw new Error('How are you here?');

  return (
    <div className='master'>
      Currency: {currency}
      <button
        type='button'
        onClick={() => gmUpdateInventory('CURRENCY', currency + 1)}
      >
        hi
      </button>
    </div>
  );
};

export default Master;
