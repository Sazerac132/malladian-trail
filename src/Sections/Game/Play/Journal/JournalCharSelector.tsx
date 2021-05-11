import React from 'react';
import { useSelector } from 'react-redux';

import { CharIndex, SystemStore } from '../../../../types';

interface CharSelectorProps {
  activeJournalChar: CharIndex;
  setActiveJournalChar: (i: CharIndex) => void;
}

const JournalCharSelector: React.FC<CharSelectorProps> = (
  props: CharSelectorProps
) => {
  const { activeJournalChar, setActiveJournalChar } = props;
  const characters = useSelector(
    (store: SystemStore) => store.characters.characters
  );

  return (
    <div className="log__charSelect">
      {characters.map(({ name }, i: CharIndex) => (
        <CharButton
          name={name}
          active={i === activeJournalChar}
          onClick={() => setActiveJournalChar(i)}
          key={i}
        />
      ))}
    </div>
  );
};

export default JournalCharSelector;

interface CharButtonProps {
  active: boolean;
  name: string;
  onClick: () => void;
}

function CharButton(props: CharButtonProps): React.ReactElement {
  const { name, onClick } = props;
  return (
    <div className="log__charSelect--option">
      <button onClick={onClick}>{name}</button>
    </div>
  );
}
