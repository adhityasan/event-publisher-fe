import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

interface IAppProviderProps {
  children: ReactNode;
  initialState?: AppContext.IState;
}

interface IDefaultAppContext {
  [key: string]: any;
}

const defaultAppContextState: IDefaultAppContext = {};

const AppContext = createContext<IDefaultAppContext>({
  appState: defaultAppContextState,
  setAppState: () => {},
  updateAppState: () => {}
});

const { Provider } = AppContext;

export const Consumer = AppContext.Consumer;

export const EventProvider: React.FC<IAppProviderProps> = ({ children, initialState }: any) => {
  const [contextState, setContextState] = useState(initialState || defaultAppContextState);

  const setEventState = useCallback((newState, preUpdate) => {
    setContextState((prevState: any) => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return { ...prevState, ...newState };
    });
  }, []);

  const updateAppState = useCallback((freshAppState: AppContext.IState) => setContextState(freshAppState), []);

  const appContextValue = {
    eventState: contextState,
    setEventState,
    updateAppState
  };

  return <Provider value={appContextValue}>{children}</Provider>;
};

export const useEventContext = (): any => useContext<IDefaultAppContext>(AppContext);

export default AppContext;
