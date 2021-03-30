import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { PlayContext } from '../../../Contexts/PlayContext';
import { GameContext } from '../../../Contexts/GameContext';

import Greet from './Greet';
import PlayNav from './PlayNav';
import CharacterCreation from './Character/CharacterCreation';

import './style.scss';

const Play = () => {
  const { section } = useContext(PlayContext);
  const { gameId } = useContext(GameContext);

  if (!gameId) {
    return <Redirect to='/game/join' />;
  }

  let playSection;
  switch (section) {
    case 'char': playSection = <CharacterCreation />; break;
    default: throw new Error(`Invalid section: '${section}'.`);
  }

  return (
    <section className='play'>
      <div className='play__content'>
        {playSection}
      </div>
      <div className='play__info'>
        <Greet />
        <PlayNav />
      </div>

    </section>
  );
};

export default Play;
