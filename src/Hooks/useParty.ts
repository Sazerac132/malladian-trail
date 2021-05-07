import { useEffect } from 'react';

import Fetcher from '../Helpers/Fetcher';
import { Party, SystemStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { getPartyThunk, setParty } from '../Store/PartySlice';

interface UseParty {
  updateParty: () => void;
}

const useParty = (): UseParty => {
  const dispatch = useDispatch();
  const isInGame = useSelector((store: SystemStore) => store.game.isInGame);

  const updateParty = () => {
    dispatch(getPartyThunk());
  };

  useEffect(() => {
    if (!isInGame) {
      dispatch(setParty([]));
      return;
    }

    updateParty();
  }, [isInGame]);

  return {
    updateParty
  };
};

export default useParty;
