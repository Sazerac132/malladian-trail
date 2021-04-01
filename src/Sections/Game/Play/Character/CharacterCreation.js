import React, { useState, useContext } from 'react';

import { GameContext } from '../../../../Contexts/GameContext';

import HowManyPlayers from './HowManyPlayers';
import CreateCharForm from './CreateCharForm';
import MyCharacterDisplay from './MyCharacterDisplay';

const CharacterCreation = () => {
  const {
    character1,
    character2,
    numPlayers
  } = useContext(GameContext);

  const [editing1, setEditing1] = useState(false);
  const [editing2, setEditing2] = useState(false);

  return (
    <>
      <h1>Character Creation</h1>
      <HowManyPlayers />

      {(numPlayers >= 1) && (
        (character1.id && !editing1)
          ? (
            <MyCharacterDisplay
              character={character1}
              index={0}
              update={() => setEditing1(true)}
            />
          )
          : (
            <CreateCharForm
              character={character1}
              index={0}
              editing={editing1}
              cancel={() => {
                setEditing1(false);
                character1.resetForm();
              }}
              done={() => setEditing1(false)}
            />
          )
      )}
      {(numPlayers === 2) && (
        (character2.id && !editing2)
          ? (
            <MyCharacterDisplay
              character={character2}
              index={1}
              update={() => setEditing2(true)}
            />
          )
          : (
            <CreateCharForm
              character={character2}
              index={1}
              editing={editing2}
              cancel={() => {
                setEditing2(false);
                character2.resetForm();
              }}
              done={() => setEditing2(false)}
            />
          )
      )}
    </>
  );
};

export default CharacterCreation;
