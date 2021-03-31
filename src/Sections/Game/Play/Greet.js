import React, { useContext } from 'react';

import { GameContext } from '../../../Contexts/GameContext';

import './style.scss';

const Greet = () => {
  const {
    character1,
    character2
  } = useContext(GameContext);

  return (
    <div className='greet'>
      Welcome,
      {character1.name}
      !
    </div>
  );
};

export default Greet;
