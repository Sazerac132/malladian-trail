import React, { useState, useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';

import CreateCharForm from './CreateCharForm';

const CharacterCreation = () => {
  const {
    character1,
    character2
  } = useContext(GameContext);

  return (
    <>
      <div>How many people playing?</div>
      <CreateCharForm character={character1} />
    </>
  );
};

export default CharacterCreation;
