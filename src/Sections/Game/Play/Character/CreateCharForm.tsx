import { joiResolver } from '@hookform/resolvers/joi';
import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { ManageCharContext } from '../../../../Contexts/ManageCharContext';
import { charSchema } from '../../../../Helpers/Validator';
import CharIconSelect from './CharIconSelect';

import { Character, PET, SystemStore } from '../../../../types';

import './style.scss';

const CreateCharForm: React.FC = () => {
  const { character, saveCharacter, index, setMode, setEditMode } = useContext(
    ManageCharContext
  );

  const inactive = useSelector((store: SystemStore) => store.party.inactive);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(charSchema)
  });

  const [view, setView] = useState<'form' | 'icon'>('form');

  const editing = !!character?.id;
  const onSubmit = handleSubmit(async (characterChanges: Character) => {
    await saveCharacter({
      ...character,
      ...characterChanges
    });
    setMode('view');
  });

  const submitText = editing ? 'Update' : 'Create';

  if (view === 'icon') {
    return (
      <Controller
        render={({ field: { onChange, value, ref } }) => (
          <CharIconSelect
            onChange={onChange}
            value={value}
            inputRef={ref}
            cancel={() => setView('form')}
          />
        )}
        defaultValue={character?.icon}
        control={control}
        name="icon"
      />
    );
  }

  const iconValInForm = getValues('icon');
  const hasIcon =
    iconValInForm === undefined
      ? !!character?.icon
      : typeof iconValInForm === 'number';

  return (
    <div className="createChar">
      {!editing && inactive.length > 0 && (
        <div className="createChar__claim">
          There are inactive characters you can{' '}
          <a onClick={() => setEditMode('claim')}>claim</a>.
        </div>
      )}
      <form
        onSubmit={onSubmit}
        className="createCharForm userForm"
        id={`createCharForm-${index}`}
      >
        <label>
          <span>Avatar</span>
          <div>
            {hasIcon ? 'Selected.' : 'Not selected.'}{' '}
            <a onClick={() => setView('icon')}>
              {hasIcon ? 'Change...' : 'Choose...'}
            </a>
          </div>
        </label>
        <label htmlFor={`charName-${index}`}>
          <span>Name</span>
          <input
            defaultValue={character?.name}
            type="text"
            id={`charName-${index}`}
            {...register('name')}
          />
        </label>
        <label htmlFor={`charStory-${index}`}>
          <span>Backstory</span>
          <textarea
            defaultValue={character?.desc}
            id={`charStory-${index}`}
            {...register('desc')}
          />
        </label>
        <label
          htmlFor={`charTraits-${index}`}
          className="createCharForm--small"
        >
          <span>Traits</span>
          <textarea
            defaultValue={character?.traits}
            id={`charTraits-${index}`}
            {...register('traits')}
          />
        </label>
        <label htmlFor={`charOther-${index}`} className="createCharForm--small">
          <span>Other</span>
          <textarea
            defaultValue={character?.other}
            id={`charOther-${index}`}
            {...register('other')}
          />
        </label>
        <label htmlFor={`charPetName-${index}`}>
          <span>Pet Name</span>
          <textarea
            defaultValue={character?.petName}
            id={`charPetName-${index}`}
            {...register('petName')}
          />
        </label>
        <label htmlFor={`charPet-${index}`}>
          <span>Pet</span>
          <select
            defaultValue={character?.pet}
            id={`charPet-${index}`}
            {...register('pet')}
          >
            <option value={PET.Bear}>Bear (+ Stamina)</option>
            <option value={PET.Falcon}>Falcon (+ Perception)</option>
            <option value={PET.Nightingale}>Nightingale (+ Regen)</option>
            <option value={PET.Wolf}>Wolf (+ Strength)</option>
            <option value={PET.Raven}>Raven (+ Agility)</option>
          </select>
        </label>
      </form>
      {editing && (
        <button type="button" onClick={() => setMode('view')}>
          Cancel
        </button>
      )}
      <button type="submit" form={`createCharForm-${index}`} value="Create">
        {submitText}
      </button>
      {Object.keys(errors).length > 0 && (
        <div className="createChar__error">
          {Object.values(errors).map((e) => (
            <>
              `- ${e.message}`<br />
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCharForm;
