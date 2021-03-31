import React, { useState, useRef } from 'react';

const useWebSocket = () => {
  const socket = useRef(null);
  const [dispatch, setDispatch] = useState(() => () => false);

  const initiateWebSocket = () => {
    socket.current = new WebSocket('ws://localhost:3001');
    setDispatch(() => {
      return (data) => socket.current.send(JSON.stringify(data));
    });
  };

  const closeWebSocket = () => {
    if (socket && socket.current) {
      socket.current.close();
      setDispatch(() => {
        return () => false;
      });
    }
  };

  return {
    socket: socket.current,
    initiateWebSocket,
    closeWebSocket,
    dispatch
  };
};

export default useWebSocket;
