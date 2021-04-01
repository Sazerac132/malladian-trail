import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { PlayContext } from '../../../Contexts/PlayContext';
import { GameContext } from '../../../Contexts/GameContext';

import Greet from './Greet';
import PlayNav from './PlayNav';
import Act from './Act';
import CharacterCreation from './Character/CharacterCreation';
import Map from './Map';
import Party from './Party';
import Log from './Log';

import './style.scss';

const Play = () => {
  const { section } = useContext(PlayContext);
  const { loading, gameId } = useContext(GameContext);

  if (!loading && !gameId) {
    return <Redirect to='/game/join' />;
  }

  let playSection;
  switch (section) {
    case 'char': playSection = <CharacterCreation />; break;
    case 'party': playSection = <Party />; break;
    case 'map': playSection = <Map />; break;
    case 'log': playSection = <Log />; break;
    default: throw new Error(`Invalid section: '${section}'.`);
  }

  return (
    <section className='play'>
      <div className='play__content'>
        {playSection}
        <Act />
      </div>
      <div className='play__info'>
        <Greet />
        <PlayNav />
      </div>

    </section>
  );
};

export default Play;
