import React, { useState } from 'react';

import ManageCharProvider from '../../../../Contexts/ManageCharContext';
import ManageCharConsumer from './ManageCharConsumer';
import SelectCharacter from './SelectCharacter';

import { CharIndex } from '../../../../types';

const CharacterCreation = () => {
  const [activeChar, setActiveChar] = useState<CharIndex>(0);

  return (
    <div className="char">
      <h1>Character Creation</h1>
      <SelectCharacter
        switchChar={() => setActiveChar((c) => (c === 0 ? 1 : 0))}
        activeChar={activeChar}
      />
      {[...Array(2)].map((_, i: CharIndex) => (
        <ManageCharProvider index={i} key={`manage-char-${i}`}>
          <ManageCharConsumer activeChar={activeChar} />
        </ManageCharProvider>
      ))}
    </div>
  );
};

export default CharacterCreation;
