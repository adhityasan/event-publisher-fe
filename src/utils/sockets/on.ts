export type OnCallback = (data: any) => void;
export type SocketOnEvent = (callback: OnCallback) => void;

export const onConnect: SocketOnEvent = (callback) => {
  window.socket.on('connect', callback);
};

export const onNews: SocketOnEvent = (callback) => {
  window.socket.on('news', callback);
};
