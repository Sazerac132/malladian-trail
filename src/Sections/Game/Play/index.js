import React from 'react';

import PlayContextProvider from '../../../Contexts/PlayContext';
import Play from './Play';

const PlayWrapper = () => {
  return (
    <PlayContextProvider>
      <Play />
    </PlayContextProvider>
  );
};

export default PlayWrapper;
