import React, { useState } from 'react';

import { CharIndex, PET } from '../../../../types';
import { UseCharacter } from '../../../../Hooks/useCharacter';

import './style.scss';

interface CreateCharFormProps {
  character: UseCharacter;
  index: CharIndex;
  editing: boolean;
  cancel: () => unknown;
  done: () => unknown;
}

const CreateCharForm: React.FC<CreateCharFormProps> = ({
  character,
  index,
  editing,
  cancel,
  done
}: CreateCharFormProps) => {
  const {
    updateForm,
    form: { name, desc, pet, petName, traits, other }
  } = character;

  const [error, setError] = useState('');

  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    if (
      name.length < 3 ||
      name.length > 20 ||
      petName.length < 3 ||
      petName.length > 20
    ) {
      setError('Character/Pet names must be between 3 and 20 characters.');
      return;
    }

    if (
      !/^([a-zA-Z0-9\s']*)$/i.test(name) ||
      !/^([a-zA-Z0-9\s']*)$/i.test(petName)
    ) {
      setError('Names must contain only letters and apostrophes.');
      return;
    }

    if (desc.length > 1000) {
      setError('Char story must be 1000 or fewer characters.');
      return;
    }

    if (traits.length > 200) {
      setError('Traits must be 200 or fewer characters.');
      return;
    }

    if (other.length > 200) {
      setError("'Other' must be 200 or fewer characters.");
      return;
    }

    if (!PET[pet]) {
      setError('Invalid pet!');
    }

    character.save(index).then(() => {
      setError('');
      done();
    });
  };

  const submitText = editing ? 'Update' : 'Create';

  return (
    <div className="createChar">
      <form
        onSubmit={onSubmit}
        className="createCharForm userForm"
        id={`createCharForm-${index}`}
      >
        <label htmlFor={`charName-${index}`}>
          <span>Name</span>
          <input
            type="text"
            id={`charName-${index}`}
            value={name}
            onChange={(ev) => updateForm('name', ev.target.value)}
          />
        </label>
        <label htmlFor={`charStory-${index}`}>
          <span>Backstory</span>
          <textarea
            id={`charStory-${index}`}
            value={desc}
            onChange={(ev) => updateForm('desc', ev.target.value)}
          />
        </label>
        <label
          htmlFor={`charTraits-${index}`}
          className="createCharForm--small"
        >
          <span>Traits</span>
          <textarea
            id={`charTraits-${index}`}
            value={traits}
            onChange={(ev) => updateForm('traits', ev.target.value)}
          />
        </label>
        <label htmlFor={`charOther-${index}`} className="createCharForm--small">
          <span>Other</span>
          <textarea
            id={`charOther-${index}`}
            value={other}
            onChange={(ev) => updateForm('other', ev.target.value)}
          />
        </label>
        <label htmlFor={`charPetName-${index}`}>
          <span>Pet Name</span>
          <textarea
            id={`charPetName-${index}`}
            value={petName}
            onChange={(ev) => updateForm('petName', ev.target.value)}
          />
        </label>
        <label htmlFor={`charPet-${index}`}>
          <span>Pet</span>
          <textarea
            id={`charPet-${index}`}
            value={pet}
            onChange={(ev) => updateForm('pet', parseInt(ev.target.value, 10))}
          />
        </label>
      </form>
      {editing && (
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      )}
      <button type="submit" form={`createCharForm-${index}`} value="Create">
        {submitText}
      </button>
      {error && <div className="createChar__error">{error}</div>}
    </div>
  );
};

export default CreateCharForm;
