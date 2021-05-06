import React from 'react';

import PlayContextProvider from '../../../Contexts/PlayContext';
import Play from './Play';

const PlayWrapper: React.FC = () => {
  return (
    <PlayContextProvider>
      <Play />
    </PlayContextProvider>
  );
};

export default PlayWrapper;
