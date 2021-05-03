export const notificationPath = 'notifications';

export const subsNotification = (socket: SocketIOClient.Socket, callback: (data: any) => void) => {
  // eslint-disable-next-line no-console
  console.log('SUBSCRIBE NOTIFICATION');
  socket.on(`${notificationPath} created`, callback);
};

export const unsubsNotification = (socket: SocketIOClient.Socket) => {
  // eslint-disable-next-line no-console
  console.log('UNSUBSCRIBE NOTIFICATION');
  socket.off(`${notificationPath} created`);
};
