import { unsubsNotification } from './NotificationsSocket';

export const emitAuthentication = (socket: SocketIOClient.Socket, accessToken: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    if (socket) {
      socket.emit(
        'create',
        'authentication',
        {
          strategy: 'jwt',
          accessToken: accessToken
        },
        (error: any, res: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(res);
            // eslint-disable-next-line no-console
            console.log('socket.io.client authenticated');
          }
        }
      );
    }
  });

export const emitLogout = (socket: SocketIOClient.Socket) => {
  if (socket) {
    unsubsNotification(socket);
  }
};
