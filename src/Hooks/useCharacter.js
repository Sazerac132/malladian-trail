import { useState } from 'react';

import Fetcher from '../Helpers/Fetcher';

const VALID_PETS = [
  'Bear',
  'Falcon',
  'Nightengale',
  'Wolf',
  'Raven'
];

const pickCharProperties = (char) => {
  const {
    name = '',
    desc = '',
    pet = 0,
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

const useCharacter = (existingChar = {}) => {
  const sanitisedExistingChar = pickCharProperties(existingChar);

  const [id, setId] = useState(null);
  const [character, setCharacter] = useState(sanitisedExistingChar);
  const [characterForm, setCharacterForm] = useState(sanitisedExistingChar);

  const updateForm = (key, val) => {
    setCharacterForm((char) => ({
      ...char,
      [key]: val
    }));
  };

  const resetForm = () => {
    setCharacterForm(character);
  };

  const importChar = (importedCharacter) => {
    const { id: importedId } = importedCharacter;
    const { ...sanitisedImportedChar } = pickCharProperties(importedCharacter);
    setId(importedId);
    setCharacter(sanitisedImportedChar);
    setCharacterForm(sanitisedImportedChar);
  };

  const save = (index) => {
    const payload = pickCharProperties(characterForm);

    return Fetcher.saveChar({ ...payload, index }, id)
      .then(({ id: newId }) => {
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
