import React, { useState, useContext } from 'react';

import './style.scss';

import worldMap from '../../../../images/Malladrus.jpg';

const Map = () => {
  const [mapType, setMapType] = useState('world');

  const navigate = (to) => {
    if (to === mapType) return;
    switch (to) {
      case 'world': setMapType('world'); break;
      case 'current': setMapType('current'); break;
      default: throw new Error(`Invalid map type: ${to}`);
    }
  };

  return (
    <div className='map'>
      <div className='map__select'>
        <div className='map__select--option'>
          <button
            type='button'
            className={mapType === 'world' ? 'highlight' : ''}
            onClick={() => navigate('world')}
          >
            World
          </button>
        </div>
        <div className='map__select--option'>
          <button
            type='button'
            className={mapType === 'current' ? 'highlight' : ''}
            onClick={() => navigate('current')}
          >
            Current
          </button>
        </div>
      </div>
      <div className='map__view'>
        <img src={worldMap} alt='The World Map.' />
      </div>
    </div>
  );
};

export default Map;
