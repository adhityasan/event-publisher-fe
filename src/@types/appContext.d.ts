interface IEventCategories {
  _id: string;
  category: string;
}

interface IEventFormat {
  _id: string;
  format: string;
}

interface Interest {
  _id: string;
  category: string;
}

interface IUser {
  _id: string;
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
  verified: boolean;
  interest: Interest[];
}

interface IUsersEventOrganizer {
  _id: string;
  name: string;
  description: string;
  content: string;
  pictureUrl: string;
  creator: {
    _id: string;
    name: string;
    email: string;
  };
  committee: any[];
  contact: {
    email: string;
    phone: string;
  };
}

declare namespace AppContext {
  interface IMaster {
    eventCategories: IEventCategories[];
    eventFormat: IEventFormat[];
  }

  interface IState {
    auth: boolean;
    accessToken: string;
    user?: IUser | null;
    users_event_organizers?: IUsersEventOrganizer[];
    _master_eventCategories?: any[];
    _master_eventFormats?: any[];
  }

  type Dispatch = React.Dispatch<React.SetStateAction<IState>>;

  interface IValue {
    appState: IState;
    setAppState: (newState: Partial<IState>, preUpdate?: any) => void;
    updateAppState: (updateFunction: IState) => void;
  }
}
