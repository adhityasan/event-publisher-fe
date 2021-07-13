interface IFromData {
  _id: string;
  name: string;
  email: string;
}

declare namespace NotificationsContext {
  interface INotification {
    _id: string;
    hash?: string;
    detailPath?: string;
    message: string;
    from: IFromData;
    to?: string;
    createdAt?: string;
    updatedAt?: string;
    isOpened?: boolean;
  }

  type IState = INotification[];

  interface IValue {
    notifications: IState;
    notificationsCount: number;
    setNotification: (newNotification: INotification, preUpdate?: any) => void;
    updateNotifications: (updateFunction: IState) => void;
  }
}
