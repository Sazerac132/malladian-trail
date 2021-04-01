import React, { useContext } from 'react';

import { GameContext } from '../../../Contexts/GameContext';
import { PlayContext } from '../../../Contexts/PlayContext';

import './style.scss';

const PlayNav = () => {
  const {
    numCharacters
  } = useContext(GameContext);

  const {
    section,
    navigate
  } = useContext(PlayContext);

  const charText = numCharacters === 2 ? 'Characters' : 'Character';
  return (
    <div className='play__nav'>
      <button
        type='button'
        disabled={numCharacters === 0}
        className={`play__nav--menuItem ${section === 'char' ? 'highlight' : ''}`}
        onClick={() => navigate('char')}
      >
        {charText}
      </button>
      <button
        type='button'
        className={`play__nav--menuItem ${section === 'map' ? 'highlight' : ''}`}
        onClick={() => navigate('map')}
      >
        Map
      </button>
      <button
        type='button'
        className={`play__nav--menuItem ${section === 'party' ? 'highlight' : ''}`}
        onClick={() => navigate('party')}
      >
        Party
      </button>
      <button
        type='button'
        className={`play__nav--menuItem ${section === 'log' ? 'highlight' : ''}`}
        onClick={() => navigate('log')}
      >
        Log
      </button>
    </div>
  );
};

export default PlayNav;
