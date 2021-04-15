declare namespace AppContext {
  interface IUser {
    auth: boolean;
    token: string;
    name: string;
    email: string;
    userId: string;
  }

  interface IState {
    user?: IUser;
  }
}
