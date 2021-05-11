import clsx from 'clsx';
import React, { useContext } from 'react';

import CharacterIcon from '../../../../Components/CharacterIcon';
import { ManageCharContext } from '../../../../Contexts/ManageCharContext';
import TextFormatter from '../../../../Helpers/TextFormatter';

const MyCharacterDisplay: React.FC = () => {
  const {
    character: { icon, name, desc, pet, petName, traits, other },
    index,
    setMode
  } = useContext(ManageCharContext);

  const wrapperClass = clsx(
    'myCharacter',
    index > 0 && 'myCharacter--inverted'
  );

  return (
    <div className={wrapperClass}>
      <CharacterIcon index={icon} noPlaceholder />
      <h2>{name}</h2>
      <div>{desc}</div>
      {traits && <CharSection title="Traits" text={traits} />}
      {other && <CharSection title="Other Details" text={other} />}
      <button type="button" onClick={() => setMode('edit')}>
        Update
      </button>
    </div>
  );
};

export default MyCharacterDisplay;

interface CharSectionProps {
  title: string;
  text: string;
}

function CharSection(props: CharSectionProps): React.ReactElement {
  const { title, text } = props;
  return (
    <div className="myCharacter--section">
      <h4>{title}</h4>
      <div>{TextFormatter.formatText(text)}</div>
    </div>
  );
}
