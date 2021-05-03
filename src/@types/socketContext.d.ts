declare namespace SocketContext {
  interface IValue {
    socket: SocketIOClient.Socket;
    setSocket: (updateFunction: State) => void;
    subsPaths: string[];
    setSubsPaths: React.Dispatch<React.SetStateAction<string[]>>;
  }
}
