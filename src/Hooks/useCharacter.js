import { useState } from 'react';

import Fetcher from '../Helpers/Fetcher';

const VALID_PETS = [
  'Bear',
  'Falcon',
  'Nightengale',
  'Wolf',
  'Raven'
];

const useCharacter = (existingChar = {}) => {
  const {
    name: existingName = '',
    desc: existingDesc = '',
    pet: existingPet = 0,
    petName: existingPetName = ''
  } = existingChar;

  const [name, setName] = useState(existingName);
  const [desc, setDesc] = useState(existingDesc);
  const [pet, setPet] = useState(existingPet);
  const [petName, setPetName] = useState(existingPetName);

  const [nameForm, setNameForm] = useState(name);
  const [descForm, setDescForm] = useState(desc);
  const [petForm, setPetForm] = useState(pet);
  const [petNameForm, setPetNameForm] = useState(petName);

  const updateForm = (key, val) => {
    switch (key) {
      case 'name': setNameForm(val); break;
      case 'desc': setDescForm(val); break;
      case 'pet': setPetForm(val); break;
      case 'petName': setPetNameForm(val); break;
      default: throw new Error(`[useCharacter] Unknown key: ${key}`);
    }
  };

  const importChar = (importedCharacter) => {
    setName(importedCharacter.name);
    setDesc(importedCharacter.desc);
    setPet(importedCharacter.pet);
    setPetName(importedCharacter.petName);
  };

  const save = () => {
    const charData = {
      name: nameForm,
      desc: descForm,
      pet: petForm,
      petName: petNameForm
    };

    importChar(charData);

    return Fetcher.saveChar(charData);
  };

  return {
    name,
    desc,
    pet,
    petName,
    nameForm,
    descForm,
    petForm,
    petNameForm,
    updateForm,
    save,
    importChar
  };
};

export default useCharacter;
