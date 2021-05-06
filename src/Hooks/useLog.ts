import { useState, useEffect } from 'react';

import Fetcher, { LogUpdatePayload } from '../Helpers/Fetcher';
import { Id, LogEntry, Party } from '../types';

interface UseLog {
  log: LogEntry[];
  loading: boolean;
  addLogItem: (item: any, party: Party) => void;
  removeLogItem: (id: number) => void;
  removeLogItemLocal: (id: number) => void;
  postLogItem: (payload: LogUpdatePayload) => void;
}

const useLog = (gameId: Id): UseLog => {
  const [log, setLog] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const addLogItem = (item: LogEntry, party: Party = []) => {
    const char = item.charId
      ? party.find(({ id }) => id === item.charId)?.name
      : null;

    setLog((oldLog) => {
      return [...oldLog, { ...item, char: char || null } as LogEntry];
    });
  };

  const postLogItem = (payload: LogUpdatePayload) => {
    Fetcher.postLogItem(payload);
  };

  const removeLogItemLocal = (idToRemove: number) => {
    console.log(idToRemove);
    setLog((currentLog) => {
      return currentLog.filter((li) => {
        const { id } = li;

        console.log(typeof idToRemove, typeof id);
        return id !== idToRemove;
      });
    });
  };

  const removeLogItem = (id: number) => {
    Fetcher.removeLogItem(id);
  };

  useEffect(() => {
    if (!gameId && !loading) {
      setLog([]);
      return;
    }

    const getLog = async () => {
      setLoading(true);
      const { log: retrievedLog } = await Fetcher.getLog();
      setLoading(false);
      setLog(retrievedLog);
    };

    getLog();
  }, [gameId]);

  return {
    log,
    loading,
    addLogItem,
    removeLogItem,
    removeLogItemLocal,
    postLogItem
  };
};

export default useLog;
