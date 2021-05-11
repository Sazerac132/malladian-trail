import React from 'react';

import CharacterIcon from '../../../../Components/CharacterIcon';

import { Character } from '../../../../types';

interface ShowcaseProps {
  character: Character;
  action?: React.ReactElement;
}

const CharShowcase: React.FC<ShowcaseProps> = (props: ShowcaseProps) => {
  const { character, action } = props;
  return (
    <div>
      <CharacterIcon index={character.icon} />
      {character.name}
      {action}
    </div>
  );
};

export default CharShowcase;
