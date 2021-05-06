import { useRef } from 'react';

interface UseWebSocket {
  socket: WebSocket | null;
  initiateWebSocket: () => void;
  closeWebSocket: () => void;
}

const useWebSocket = (): UseWebSocket => {
  const socket = useRef<null | WebSocket>(null);

  const initiateWebSocket = () => {
    socket.current = new WebSocket('ws://localhost:3001');
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
