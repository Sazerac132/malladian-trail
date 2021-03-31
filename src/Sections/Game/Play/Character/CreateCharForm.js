import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { GameContext } from '../../../../Contexts/GameContext';

import './style.scss';

const CreateCharForm = ({ character }) => {
  const { dispatch } = useContext(GameContext);

  const {
    nameForm: name,
    descForm: desc,
    petForm: pet,
    petNameForm: petName,
    updateForm
  } = character;

  const [error, setError] = useState('');

  const onSubmit = (ev) => {
    ev.preventDefault();

    if (name.length < 3
      || name.length > 20
      || petName.length < 3
      || petName.length > 20) {
      setError('Character/Pet names must be between 3 and 20 characters.');
      return;
    }

    if (!(/^([a-zA-Z0-9\s']*)$/i).test(name)
      || !(/^([a-zA-Z0-9\s']*)$/i).test(petName)) {
      setError('Names must contain only letters and apostrophes.');
      return;
    }

    if (pet < 0 || pet > 5) {
      setError('Invalid pet!');
    }

    character.save()
      .then(() => {
        dispatch({
          message: 'CHARACTER_CREATED'
        });
        setError('');
      });
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className='createCharForm userForm'
        id='createCharForm'
      >
        <label htmlFor='charName'>
          <span>Name</span>
          <input
            type='text'
            id='charName'
            value={name}
            onChange={(ev) => updateForm('name', ev.target.value)}
          />
        </label>
        <label htmlFor='charName'>
          <span>Backstory</span>
          <textarea
            type='text'
            id='charStory'
            value={desc}
            onChange={(ev) => updateForm('desc', ev.target.value)}
          />
        </label>
        <label htmlFor='charName'>
          <span>Pet Name</span>
          <textarea
            type='text'
            id='charStory'
            value={petName}
            onChange={(ev) => updateForm('petName', ev.target.value)}
          />
        </label>
        <label htmlFor='charName'>
          <span>Pet</span>
          <textarea
            type='text'
            id='charStory'
            value={pet}
            onChange={(ev) => updateForm('pet', parseInt(ev.target.value, 10))}
          />
        </label>
      </form>
      <button type='submit' form='createCharForm' value='Create'>Create</button>
      {error && (
        <div className='initiateGame__error'>{error}</div>
      )}
    </>
  );
};

CreateCharForm.propTypes = {
  character: PropTypes.shape({
    nameForm: PropTypes.string,
    descForm: PropTypes.string,
    petForm: PropTypes.number,
    petNameForm: PropTypes.string,
    updateForm: PropTypes.func,
    save: PropTypes.func
  })
};

export default CreateCharForm;
