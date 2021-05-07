import React from 'react';

import './style.scss';

import coins from '../../../images/icons/coins.png';
import hourglass from '../../../images/icons/hourglass.png';
import { useSelector } from 'react-redux';
import { SystemStore } from '../../../types';

const Greet: React.FC = () => {
  const { currency, time } = useSelector(
    (store: SystemStore) => store.inventory.data
  );
  const {
    characters: [character1, character2]
  } = useSelector((store: SystemStore) => store.characters);

  let message;

  if (!character1 && !character2) {
    message = 'Welcome!';
  } else if (character1 && character2) {
    message = `Welcome, ${character1.name} and ${character2.name}!`;
  } else {
    message = `Welcome, ${(character1 || character2).name}!`;
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
