import { useState, useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';

const useParty = (gameId) => {
  const [party, setParty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [incrementor, setIncrementor] = useState(false);

  const updateParty = () => {
    setIncrementor((b) => !b);
  };

  useEffect(() => {
    if (!gameId && !loading) {
      setParty([]);
      return;
    }

    setLoading(true);

    Fetcher.getParty()
      .then(({ party: retrievedParty }) => {
        setLoading(false);
        setParty(retrievedParty);
      });
  }, [incrementor]);

  return {
    party,
    updateParty
  };
};

export default useParty;
