import React, { useContext } from 'react';

import { GameContext } from '../../../Contexts/GameContext';

import './style.scss';

import coins from '../../../images/icons/coins.png';
import hourglass from '../../../images/icons/hourglass.png';

const Greet: React.FC = () => {
  const {
    character1,
    character2,
    numCharacters,
    inventory: { currency, time }
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
    <div className="greet">
      {message}
      <div className="greet__resources">
        <Resource icon={coins} quantity={currency} />
        <Resource icon={hourglass} quantity={time} />
      </div>
    </div>
  );
};

interface ResourceProps {
  icon: string;
  quantity: number;
}

function Resource({ icon, quantity }: ResourceProps): React.ReactElement {
  return (
    <div className="greet__resource">
      <div className="greet__resource--icon">
        <img src={icon} alt="Resource icon." />
      </div>
      <div className="greet__resource--number">{quantity}</div>
    </div>
  );
}

export default Greet;
