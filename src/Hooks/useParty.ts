import { useState, useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';
import { Id, Party } from '../types';

interface UseParty {
  party: Party;
  updateParty: () => void;
}

const useParty = (gameId: Id): UseParty => {
  const [party, setParty] = useState<Party>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [incrementor, setIncrementor] = useState<boolean>(false);

  const updateParty = () => {
    setIncrementor((b) => !b);
  };

  useEffect(() => {
    if (!gameId && !loading) {
      setParty([]);
      return;
    }

    setLoading(true);

    Fetcher.getParty().then(({ party: retrievedParty }) => {
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
