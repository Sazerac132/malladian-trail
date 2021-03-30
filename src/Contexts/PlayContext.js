import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialStore = {
  section: 'char'
};

const PLAY_SECTIONS = [
  'char',
  'map',
  'party',
  'log'
];

export const PlayContext = createContext(initialStore);

const PlayContextProvider = ({ children }) => {
  const [section, setSection] = useState('char');

  const navigate = (destination) => {
    if (!PLAY_SECTIONS.includes(destination)) {
      throw new Error(`Invalid section '${destination}'.`);
    }

    setSection(destination);
  };

  const store = {
    section,
    navigate
  };

  return (
    <PlayContext.Provider value={store}>
      {children}
    </PlayContext.Provider>
  );
};

PlayContextProvider.propTypes = {
  children: PropTypes.element
};

export default PlayContextProvider;
