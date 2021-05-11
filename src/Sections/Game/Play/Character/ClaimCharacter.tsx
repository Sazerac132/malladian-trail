import * as React from 'react';
import { useSelector } from 'react-redux';

import CharShowcase from './Showcase';

import { SystemStore } from '../../../../types';

import './style.scss';

const ClaimCharacter: React.FC = () => {
  const inactive = useSelector((store: SystemStore) => store.party.inactive);
  return (
    <div className="claimChar">
      {inactive.map((c) => {
        const claimButton = <button>Claim</button>;
        return <CharShowcase character={c} action={claimButton} key={c.id} />;
      })}
    </div>
  );
};

export default ClaimCharacter;
