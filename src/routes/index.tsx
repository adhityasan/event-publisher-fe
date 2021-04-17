import React, { useEffect, useState } from 'react';
import { Switch } from 'react-router-dom';
import LoadingApp from '../components/Loadings/LoadingApp';
import { EventOrganizerRoute, PublicUserRoute, RegisteredUserRoute } from '../components/Route';
import localStorage from '../utils/localStorage';
import { SIGNIN_API } from '../config/apiUrls';
import { AppProvider } from '../context/AppContext';
import axiosInstance from '../axios.instances';
import PublicUsersRoutes from './PublicUsers';
import RegisteredUsersRoutes from './RegisteredUsers';
import EventOrganizersRoutes from './EventOrganizers';
import NotFound from './PublicUsers/NotFound';

/**
 * all path routes that app can handle
 * NOTE: important to put NotFound page in the last index of appRoutes
 */
const appRoutes = [...PublicUsersRoutes, ...EventOrganizersRoutes, ...RegisteredUsersRoutes, NotFound];

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
