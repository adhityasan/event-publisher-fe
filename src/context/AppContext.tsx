import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';

interface IAppProviderProps {
  children: ReactNode;
  initialState?: AppContext.IState;
}

const defaultAppContextState: AppContext.IState = {
  auth: false,
  accessToken: '',
  user: null
};

const AppContext = createContext<AppContext.IValue>({
  appState: defaultAppContextState,
  setAppState: () => {},
  updateAppState: () => {}
});

const { Provider } = AppContext;

export const Consumer = AppContext.Consumer;

export const AppProvider = ({ children, initialState }: IAppProviderProps) => {
  const [contextState, setContextState] = useState<AppContext.IState>(initialState || defaultAppContextState);

  const setAppState = useCallback((newState, preUpdate) => {
    setContextState((prevState) => {
      if (preUpdate && preUpdate.call) {
        preUpdate();
      }
      return { ...prevState, ...newState };
    });
  }, []);

  const updateAppState = useCallback((freshAppState: AppContext.IState) => setContextState(freshAppState), []);

  const appContextValue: AppContext.IValue = {
    appState: contextState,
    setAppState,
    updateAppState
  };

  return <Provider value={appContextValue}>{children}</Provider>;
};

export const useAppContext = (): AppContext.IValue => useContext<AppContext.IValue>(AppContext);

export default AppContext;
