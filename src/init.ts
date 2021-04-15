import io from 'socket.io-client';

import { API_URL, APP_USE_SOCKET_IO } from './config/app';
import localStorage from './utils/localStorage/index';

import { onConnect } from './utils/sockets';

// initial or update localStorage data
export const initLocalStorage = (): void => {
  const init = () => {
    localStorage.clear();
    localStorage.initiated.init();
  };

  // schedule to reset all saved localStorage data in the client browser
  const resetSchedule: string | undefined = process.env.REACT_APP_SCHEDULE_RESET_LOCALSTORAGE;

  if (resetSchedule) {
    const resetDate = new Date(resetSchedule);
    const currentDate = new Date();
    if (currentDate.getTime() > resetDate.getTime()) {
      init();
      return;
    }
  }

  // clear saved localStorage data on first visit
  if (!localStorage.initiated.isExist()) {
    init();
    return;
  }

  // update localStorage.initiated.last_visit property
  const lastVisit = new Date().getTime();
  const existInitiated = localStorage.initiated.get();

  localStorage.initiated.set({
    ...existInitiated,
    last_visit: lastVisit
  });
};

declare global {
  interface Window {
    socket: SocketIOClient.Socket;
  }
}

const connectSocketIOClient = (): void => {
  if (API_URL && APP_USE_SOCKET_IO) {
    const socket = io(API_URL);
    window.socket = socket;

    onConnect(() => {
      // eslint-disable-next-line no-console
      console.log('socket.IO connected');
    });
  }
};

export default function (): void {
  initLocalStorage();
  connectSocketIOClient();
}
