import React from 'react';
import { Character, CharIndex } from '../../../../types';

interface CharDisplayProps {
  character: Character;
  index: CharIndex;
  update: () => unknown;
}

const MyCharacterDisplay: React.FC<CharDisplayProps> = ({
  character,
  index,
  update
}: CharDisplayProps) => {
  const { name, desc, pet, petName, traits, other } = character;

  let wrapperClass = 'myCharacter';
  if (index > 0) wrapperClass += ' myCharacter--inverted';

  return (
    <div className={wrapperClass}>
      <img src="https://loremflickr.com/150/150" alt="portrait" />
      <strong>Name:</strong>
      &nbsp;{name}
      <div>{desc}</div>
      <button type="button" onClick={update}>
        Update
      </button>
    </div>
  );
};

export default MyCharacterDisplay;
