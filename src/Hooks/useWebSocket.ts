import { useRef } from 'react';
import useInventory from './useInventory';
import useLog from './useLog';
import { LogEntry } from '../types';
import Logger from '../Helpers/Logger';
import useParty from './useParty';

interface UseWebSocket {
  socket: WebSocket | null;
  initiateWebSocket: () => void;
  closeWebSocket: () => void;
}

const useWebSocket = (): UseWebSocket => {
  const socket = useRef<null | WebSocket>(null);
  const { setItem, setCurrency, setTime } = useInventory();
  const { addJournalItemLocal, removeJournalItemLocal } = useLog();
  const { updateParty } = useParty();

  const initiateWebSocket = () => {
    socket.current = new WebSocket('ws://localhost:3001');

    socket.current.onmessage = ({ data }: { data: string }) => {
      const { instruction, message } = JSON.parse(data);

      switch (instruction) {
        case 'update party':
          updateParty();
          break;
        case 'update inventory':
          setItem(...(message as [string, number]));
          break;
        case 'update gold':
          setCurrency(parseInt(message, 10));
          break;
        case 'update time':
          setTime(parseInt(message, 10));
          break;
        case 'add event':
          addJournalItemLocal(message as LogEntry);
          break;
        case 'delete event':
          removeJournalItemLocal(parseInt(message, 10));
          break;
        default:
          Logger.log(`Unhandled WebSocket message: ${instruction}`);
          break;
      }
    };
  };

  const closeWebSocket = () => {
    if (socket && socket.current) {
      socket.current.close();
    }
  };

  return {
    socket: socket.current,
    initiateWebSocket,
    closeWebSocket
  };
};

export default useWebSocket;
