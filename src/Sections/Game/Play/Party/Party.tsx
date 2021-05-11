import React from 'react';
import { useSelector } from 'react-redux';

import CharShowcase from '../Character/Showcase';

import { SystemStore } from '../../../../types';

import './style.scss';

const Party: React.FC = () => {
  const party = useSelector((store: SystemStore) => store.party.lineup);
  return (
    <div className="party">
      {party.map((char) => (
        <CharShowcase character={char} key={`party-member-${char.id}`} />
      ))}
    </div>
  );
};

export default Party;
