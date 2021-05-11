import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeMap } from '../../../../Store/NavigationSlice';
import worldMap from '../../../../images/Malladrus.jpg';

import { MapSection, SystemStore } from '../../../../types';

import './style.scss';

const Map = () => {
  const dispatch = useDispatch();
  const mapSection = useSelector(
    (store: SystemStore) => store.navigation.mapSection
  );

  const navigate = (mapSection: MapSection) => {
    dispatch(changeMap({ mapSection }));
  };

  return (
    <div className="map">
      <div className="map__select">
        <div className="map__select--option">
          <button
            type="button"
            className={mapSection === 'world' ? 'highlight' : ''}
            onClick={() => navigate('world')}
          >
            World
          </button>
        </div>
        <div className="map__select--option">
          <button
            type="button"
            className={mapSection === 'current' ? 'highlight' : ''}
            onClick={() => navigate('current')}
          >
            Current
          </button>
        </div>
      </div>
      <div className="map__view">
        <img src={worldMap} alt="The World Map." />
      </div>
    </div>
  );
};

export default Map;
