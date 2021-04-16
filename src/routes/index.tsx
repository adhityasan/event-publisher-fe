import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import LoadingApp from '../components/Loadings/LoadingApp';
import { EventOrganizerRoute, PublicUserRoute, RegisteredUserRoute } from '../components/Route';
import localStorage from '../utils/localStorage';
import { SIGNIN_API } from '../config/apiUrls';
import { AppProvider } from '../context/AppContext';
import axiosInstance from '../axios.instances';
import Home from './Home';
import NotFound from './NotFound';
import About from './About';
import Signin from './SignIn';
import Signup from './SignUp';
import SearchEvent from './SearchEvent';
import EmailVerification from './EmailVerification';
import Interest from './Interest';
import SignOut from './SignOut';

const appRoutes = [Home, About, Signin, Signup, EmailVerification, SearchEvent, Interest, SignOut, NotFound];

const InitRenderRoutes = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [appInitialContextValue, setAppInitialContextValue] = useState<AppContext.IState>();

  useEffect(() => {
    const accessToken = localStorage.accessToken.get();
    if (accessToken) {
      axiosInstance
        .post(SIGNIN_API, { strategy: 'jwt', accessToken })
        .then(({ data }) =>
          setAppInitialContextValue({
            auth: true,
            accessToken: data.accessToken,
            user: data.user
          })
        )
        .finally(() => {
          setTimeout(() => {
            setIsAuthenticating(false);
          }, 300);
        });
    }
  }, []);

  return isAuthenticating ? (
    <LoadingApp width="100vw" height="100vh" />
  ) : (
    <AppProvider key="eventpublish-context-provider" initialState={appInitialContextValue}>
      <Switch>
        {appRoutes.map((route, i) => {
          if (route.auth) {
            if (route.layout === 'event-organizer') {
              return <EventOrganizerRoute {...route} key={i} />;
            }
            return <RegisteredUserRoute {...route} key={i} />;
          }
          return <PublicUserRoute {...route} key={i} />;
        })}
      </Switch>
    </AppProvider>
  );
};

export default InitRenderRoutes;
