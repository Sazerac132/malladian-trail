import React from 'react';
import PropTypes from 'prop-types';

const MyCharacterDisplay = ({ character, index, update }) => {
  const { name, desc, pet, petName, traits, other } = character;

  let wrapperClass = 'myCharacter';
  if (index > 0) wrapperClass += ' myCharacter--inverted';

  return (
    <div className={wrapperClass}>
      <img src='https://loremflickr.com/150/150' alt='portrait' />
      <strong>Name:</strong>
      &nbsp;{name}
      <div>{desc}</div>
      <button type='button' onClick={update}>Update</button>
    </div>
  );
};

MyCharacterDisplay.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string,
    desc: PropTypes.string,
    pet: PropTypes.number,
    petName: PropTypes.string,
    traits: PropTypes.string,
    other: PropTypes.string
  }),
  index: PropTypes.oneOf([0, 1]),
  update: PropTypes.func
};

export default MyCharacterDisplay;
