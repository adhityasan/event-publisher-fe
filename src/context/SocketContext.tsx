import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import socketio from 'socket.io-client';
import { API_URL } from '../config/app';

interface ISocketProviderProps {
  children: ReactNode;
}

export const socket = socketio.connect(API_URL);

const SocketContext = createContext<SocketContext.IValue>({
  socket: socket,
  setSocket: () => {},
  subsPaths: [],
  setSubsPaths: () => {}
});

const { Provider } = SocketContext;

export const Consumer = SocketContext.Consumer;

export const SocketProvider = ({ children }: ISocketProviderProps) => {
  const [socketState, setSocketState] = useState<SocketIOClient.Socket>(socket);
  const [subsPaths, setSubsPaths] = useState<string[]>([]);

  const setSocket = useCallback((freshSocketState: SocketIOClient.Socket) => setSocketState(freshSocketState), []);

  const socketContextValue: SocketContext.IValue = {
    socket: socketState,
    setSocket,
    subsPaths,
    setSubsPaths
  };

  return <Provider value={socketContextValue}>{children}</Provider>;
};

export const useSocketContext = (): SocketContext.IValue => useContext<SocketContext.IValue>(SocketContext);

export default SocketContext;
