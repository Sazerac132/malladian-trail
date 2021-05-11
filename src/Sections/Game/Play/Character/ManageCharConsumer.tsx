import React, { useContext } from 'react';
import { useSelector } from 'react-redux';

import Oops from '../../../../Components/Oops';
import { ManageCharContext } from '../../../../Contexts/ManageCharContext';
import ClaimCharacter from './ClaimCharacter';
import CreateCharForm from './CreateCharForm';
import MyCharacterDisplay from './MyCharacterDisplay';

import { CharIndex, SystemStore } from '../../../../types';

interface ManageCharProps {
  activeChar: CharIndex;
}

const ManageCharConsumer: React.FC<ManageCharProps> = (
  props: ManageCharProps
) => {
  const { mode, editMode, index } = useContext(ManageCharContext);
  const inactive = useSelector((store: SystemStore) => store.party.inactive);

  if (index !== props.activeChar) return null;

  if (mode === 'view') return <MyCharacterDisplay />;
  if (editMode === 'manual' || inactive.length === 0) return <CreateCharForm />;
  if (editMode === 'claim') return <ClaimCharacter />;

  return <Oops />;
};

export default ManageCharConsumer;
