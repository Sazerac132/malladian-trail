import React, { useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';

import './style.scss';

const Party: React.FC = () => {
  const { party } = useContext(GameContext);

  return (
    <div>
      <div>{party.map(({ name }) => name).join(' ')}</div>
    </div>
  );
};

export default Party;
