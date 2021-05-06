import { useState } from 'react';

import Fetcher from '../Helpers/Fetcher';
import { Character, CharIndex, PET } from '../types';

const pickCharProperties = (char: Partial<Character>): Character => {
  const {
    name = '',
    desc = '',
    pet = PET['Bear'],
    petName = '',
    traits = '',
    other = '',
    active = false
  } = char;

  return {
    name,
    desc,
    pet,
    petName,
    traits,
    other,
    active
  };
};

export type UseCharacter = Character & {
  form: Character;
  updateForm: (key: string, val: Character[keyof Character]) => void;
  resetForm: () => void;
  save: (index: CharIndex) => Promise<void>;
  importChar: (char: Character) => void;
};

const useCharacter = (existingChar: Partial<Character> = {}): UseCharacter => {
  const sanitisedExistingChar = pickCharProperties(existingChar);

  const [id, setId] = useState<number | null>(null);
  const [character, setCharacter] = useState<Character>(sanitisedExistingChar);
  const [characterForm, setCharacterForm] = useState<Character>(
    sanitisedExistingChar
  );

  const updateForm = (key: string, val: Character[keyof Character]) => {
    setCharacterForm((char) => ({
      ...char,
      [key]: val
    }));
  };

  const resetForm = () => {
    setCharacterForm(character);
  };

  const importChar = (importedCharacter: Character) => {
    const { id: importedId } = importedCharacter;
    if (!importedId) {
      throw new Error('Cannot import a char without an ID.');
    }
    const { ...sanitisedImportedChar } = pickCharProperties(importedCharacter);
    setId(importedId);
    setCharacter(sanitisedImportedChar);
    setCharacterForm(sanitisedImportedChar);
  };

  const save = (index: 0 | 1) => {
    const payload = pickCharProperties(characterForm);

    return Fetcher.saveChar({ ...payload, index }, id).then(({ id: newId }) => {
      setCharacter(payload);
      if (newId) setId(newId);
    });
  };

  return {
    id,
    ...character,
    form: characterForm,
    updateForm,
    resetForm,
    save,
    importChar
  };
};

export default useCharacter;
