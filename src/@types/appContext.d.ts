declare namespace AppContext {
  interface IUser {
    _id: string;
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
    verified: false;
  }

  interface IState {
    auth: boolean;
    accessToken: string;
    user?: IUser | null;
  }

  type Dispatch = React.Dispatch<React.SetStateAction<IState>>;

  interface IValue {
    appState: IState;
    setAppState: (newState: Partial<IState>, preUpdate?: any) => void;
    updateAppState: (updateFunction: IState) => void;
  }
}
