import React from 'react';
import { useSelector } from 'react-redux';

import { CharIndex, SystemStore } from '../../../../types';

import './style.scss';

interface SelectCharacterProps {
  activeChar: CharIndex;
  switchChar: () => void;
}

const SelectCharacter: React.FC<SelectCharacterProps> = (
  props: SelectCharacterProps
) => {
  const { switchChar, activeChar } = props;
  const { characters } = useSelector((store: SystemStore) => store.characters);

  const char = characters[activeChar];
  const otherCharIndex: CharIndex = activeChar === 0 ? 1 : 0;

  const playerNumber = activeChar + 1;
  const otherPlayerNumber = otherCharIndex + 1;

  return (
    <div className="selectCharacter">
      <div>Player {playerNumber}'s Character</div>
      <button type="button" onClick={() => switchChar()}>
        Player {otherPlayerNumber}...
      </button>
    </div>
  );
};

export default SelectCharacter;
