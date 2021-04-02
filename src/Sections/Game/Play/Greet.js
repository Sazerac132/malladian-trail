import React, { useContext } from 'react';

import { GameContext } from '../../../Contexts/GameContext';

import './style.scss';

const Greet = () => {
  const {
    character1,
    character2,
    numCharacters,
    inventory: {
      currency
    }
  } = useContext(GameContext);

  let message;

  if (numCharacters === 0) {
    message = 'Welcome!';
  } else if (numCharacters === 1) {
    message = `Welcome, ${(character1 || character2).name}!`;
  } else {
    message = `Welcome, ${character1.name} and ${character2.name}!`;
  }

  return (
    <div className='greet'>
      {message}
      {(currency) && <div>{currency} gold</div>}
    </div>
  );
};

export default Greet;
