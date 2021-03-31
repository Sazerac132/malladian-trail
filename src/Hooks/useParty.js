import { useState, useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';

const useParty = () => {
  const [party, setParty] = useState([]);
  const [incrementor, setIncrementor] = useState(false);

  const updateParty = () => {
    setIncrementor((b) => !b);
  };

  useEffect(() => {
    Fetcher.getParty()
      .then(({ party: retrievedParty }) => {
        setParty(retrievedParty);
      });
  }, [incrementor]);

  return {
    party,
    updateParty
  };
};

export default useParty;
