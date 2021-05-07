import { useEffect } from 'react';

import { LogUpdatePayload } from '../Helpers/Fetcher';
import { LogEntry, SystemStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addJournalItem as addJournalItemRedux,
  addJournalItemThunk,
  getJournalThunk,
  removeJournalItem as removeJournalItemRedux,
  removeJournalItemThunk,
  setJournal
} from '../Store/JournalSlice';

interface UseLog {
  journal: LogEntry[];
  loading: boolean;
  addJournalItemLocal: (item: LogEntry) => void;
  addJournalItem: (payload: LogUpdatePayload) => void;
  removeJournalItemLocal: (id: number) => void;
  removeJournalItem: (id: number) => void;
}

const useLog = (): UseLog => {
  const { data: journal, loading } = useSelector(
    (store: SystemStore) => store.journal
  );
  const isInGame = useSelector((store: SystemStore) => store.game.isInGame);
  const dispatch = useDispatch();

  const addJournalItemLocal = (item: LogEntry) => {
    dispatch(addJournalItemRedux(item));
  };

  const addJournalItem = ({ index, action }: LogUpdatePayload) => {
    dispatch(addJournalItemThunk(index, action));
  };

  const removeJournalItemLocal = (id: number) => {
    dispatch(removeJournalItemRedux({ id }));
  };

  const removeJournalItem = (id: number) => {
    dispatch(removeJournalItemThunk(id));
  };

  useEffect(() => {
    if (!isInGame) {
      dispatch(setJournal([]));
      return;
    }

    dispatch(getJournalThunk());
  }, [isInGame]);

  return {
    journal,
    loading,
    addJournalItemLocal,
    addJournalItem,
    removeJournalItemLocal,
    removeJournalItem
  };
};

export default useLog;
