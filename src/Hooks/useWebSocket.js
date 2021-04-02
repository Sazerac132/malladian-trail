import { useRef } from 'react';

const useWebSocket = () => {
  const socket = useRef(null);

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
