import React, { useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';

import './style.scss';

const HowManyPlayers = () => {
  const {
    numPlayers,
    setNumPlayers
  } = useContext(GameContext);

  const buttons = [1, 2]
    .map((n) => {
      return (
        <button
          type='button'
          onClick={() => setNumPlayers(n)}
          className={n === numPlayers ? 'highlight' : ''}
          key={`howManyPlayersButton-${n}`}
        >
          {n}
        </button>
      );
    });

  return (
    <div className='howMany'>
      <div>How many people are playing on this device?</div>
      <div className='howMany__switch'>
        {buttons}
      </div>
    </div>
  );
};

export default HowManyPlayers;
