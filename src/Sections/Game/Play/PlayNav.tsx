import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { navigate as navigateRedux } from '../../../Store/NavigationSlice';
import { Section, SystemStore } from '../../../types';

import './style.scss';

const PlayNav: React.FC = () => {
  const dispatch = useDispatch();
  const isGm = useSelector((store: SystemStore) => store.game.data.isGm);
  const section = useSelector((store: SystemStore) => store.navigation.section);
  const numCharacters = useSelector(
    (store: SystemStore) => store.characters.numCharacters
  );

  const navigate = (destination: Section) => {
    dispatch(navigateRedux({ section: destination }));
  };

  const charText = numCharacters === 2 ? 'Characters' : 'Character';
  return (
    <div className="play__nav">
      <button
        type="button"
        disabled={numCharacters === 0}
        className={`play__nav--menuItem ${
          section === 'char' ? 'highlight' : ''
        }`}
        onClick={() => navigate('char')}
      >
        {charText}
      </button>
      <button
        type="button"
        className={`play__nav--menuItem ${
          section === 'map' ? 'highlight' : ''
        }`}
        onClick={() => navigate('map')}
      >
        Map
      </button>
      <button
        type="button"
        className={`play__nav--menuItem ${
          section === 'party' ? 'highlight' : ''
        }`}
        onClick={() => navigate('party')}
      >
        Party
      </button>
      <button
        type="button"
        className={`play__nav--menuItem ${
          section === 'log' ? 'highlight' : ''
        }`}
        onClick={() => navigate('log')}
      >
        Journal
      </button>
      {isGm && (
        <button
          type="button"
          className={`play__nav--menuItem ${
            section === 'log' ? 'highlight' : ''
          }`}
          onClick={() => navigate('master')}
        >
          Master
        </button>
      )}
    </div>
  );
};

export default PlayNav;
