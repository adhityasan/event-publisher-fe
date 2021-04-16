import React, { useEffect } from 'react';
import LoadingApp from '../../components/Loadings/LoadingApp';
import { useAppContext } from '../../context/AppContext';
import localStorage from '../../utils/localStorage';

const SignoutView = () => {
  const { setAppState } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setAppState({ auth: false, accessToken: '', user: null });
      localStorage.accessToken.remove();
    }, 300);
  }, [setAppState]);

  return <LoadingApp width="100%" height="calc(100vh - 64px)" />;
};

export default SignoutView;
