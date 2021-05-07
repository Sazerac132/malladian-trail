import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Greet from './Greet';
import PlayNav from './PlayNav';
import CharacterCreation from './Character/CharacterCreation';
import Map from './Map';
import Party from './Party';
import Log from './Log';
import Master from './Master';
import { SystemStore } from '../../../types';

import './style.scss';

const Play: React.FC = () => {
  const { loading, isInGame } = useSelector((store: SystemStore) => store.game);
  const section = useSelector((store: SystemStore) => store.navigation.section);

  if (!loading && !isInGame) {
    return <Redirect to="/game/join" />;
  }

  let playSection;
  switch (section) {
    case 'char':
      playSection = <CharacterCreation />;
      break;
    case 'party':
      playSection = <Party />;
      break;
    case 'map':
      playSection = <Map />;
      break;
    case 'master':
      playSection = <Master />;
      break;
    case 'log':
      playSection = false;
      break;
    default:
      throw new Error(`Invalid section: '${section}'.`);
  }

  return (
    <section className="play">
      <div className="play__info">
        <Greet />
        <PlayNav />
      </div>
      <div className="play__content">
        {playSection}
        <Log />
      </div>
    </section>
  );
};

export default Play;
