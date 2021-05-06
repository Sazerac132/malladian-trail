import React, { createContext, useState } from 'react';
import { Section } from '../types';

interface PlayContext {
  section: Section;
  navigate: (destination: Section) => void;
}

const initialStore: PlayContext = {
  section: 'char',
  navigate: (_: Section) => null
};

export const PlayContext = createContext<PlayContext>(initialStore);

const PlayContextProvider: React.FC = ({ children }) => {
  const [section, setSection] = useState<Section>('char');

  const navigate = (destination: Section) => {
    setSection(destination);
  };

  const store: PlayContext = {
    section,
    navigate
  };

  return <PlayContext.Provider value={store}>{children}</PlayContext.Provider>;
};

export default PlayContextProvider;
