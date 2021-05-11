import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { saveCharacterThunk } from '../Store/CharacterSlice';

import { Character, CharIndex, SystemStore } from '../types';

interface ManageCharProps extends React.PropsWithChildren<any> {
  index: CharIndex;
}

interface ManageCharStore {
  mode: Mode;
  editMode: EditMode;
  setMode: (mode: Mode) => void;
  setEditMode: (editMode: EditMode) => void;
  character: Character;
  index: CharIndex;
  saveCharacter: (char: Character) => void;
}

type Mode = 'view' | 'edit';
type EditMode = 'manual' | 'claim';

export const ManageCharContext = React.createContext<ManageCharStore>({
  mode: 'view',
  editMode: 'manual',
  setMode: () => null,
  setEditMode: () => null,
  character: null,
  index: 0,
  saveCharacter: () => null
});

const ManageCharProvider: React.FC<ManageCharProps> = (
  props: ManageCharProps
) => {
  const { index } = props;
  const dispatch = useDispatch();
  const [mode, setMode] = useState<Mode>('view');
  const [editMode, setEditMode] = useState<EditMode>('manual');
  const character = useSelector(
    (store: SystemStore) => store.characters.characters
  )[index];

  const saveCharacter = (charToSave: Character) => {
    dispatch(saveCharacterThunk(charToSave, index));
  };

  const store: ManageCharStore = {
    mode: !character ? 'edit' : mode,
    editMode,
    setMode,
    setEditMode,
    character,
    index,
    saveCharacter
  };

  return (
    <ManageCharContext.Provider value={store}>
      {props.children}
    </ManageCharContext.Provider>
  );
};

export default ManageCharProvider;
