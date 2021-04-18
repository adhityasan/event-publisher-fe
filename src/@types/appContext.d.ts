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

interface ICommittee {
  _id: string;
  name: string;
  email: string;
}
interface IEventOrganizer {
  _id: string;
  name: string;
  description: string;
  content: string;
  pictureUrl: string;
  creator: ICommittee;
  committee: ICommittee[];
  contact: {
    email: string;
    phone: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface IEoManagement {
  role: 'creator' | 'committee';
  eo: IEventOrganizer;
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
    users_event_organizers?: IEventOrganizer[];
    _master_event_categoris?: any[];
    _master_event_formats?: any[];
    eo_management?: IEoManagement;
  }

  type Dispatch = React.Dispatch<React.SetStateAction<IState>>;

  interface IValue {
    appState: IState;
    setAppState: (newState: Partial<IState>, preUpdate?: any) => void;
    updateAppState: (updateFunction: IState) => void;
  }
}
