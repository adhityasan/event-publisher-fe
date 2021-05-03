import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

interface INotificationProviderProps {
  children: ReactNode;
}

const defaultNotificationsContextState: NotificationsContext.IState = [];

const NotificationsContext = createContext<NotificationsContext.IValue>({
  notifications: defaultNotificationsContextState,
  notificationsCount: 0,
  setNotification: () => {},
  updateNotifications: () => {}
});

const { Provider } = NotificationsContext;

export const Consumer = NotificationsContext.Consumer;

export const NotificationProvider = ({ children }: INotificationProviderProps) => {
  const [contextState, setContextState] = useState<NotificationsContext.IState>([]);

  const setNotification = useCallback((newState, preUpdate) => {
    setContextState((prevState) => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return [...prevState, newState];
    });
  }, []);

  const updateNotifications = useCallback((freshAppState: NotificationsContext.IState) => setContextState(freshAppState), []);

  const notificationsContextValue: NotificationsContext.IValue = {
    notifications: contextState,
    notificationsCount: contextState.length,
    setNotification,
    updateNotifications
  };

  return <Provider value={notificationsContextValue}>{children}</Provider>;
};

export const useNotificationsContext = (): NotificationsContext.IValue =>
  useContext<NotificationsContext.IValue>(NotificationsContext);

export default NotificationsContext;
