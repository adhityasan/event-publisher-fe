import React, { useEffect, useState } from 'react';
import { Switch, useHistory } from 'react-router-dom';
import { AxiosError } from 'axios';
import LoadingApp from '../components/Loadings/LoadingApp';
import { EventOrganizerRoute, PublicUserRoute, RegisteredUserRoute, PlainRoute } from '../components/Route';
import localStorage from '../utils/localStorage';
import { SIGNIN_API } from '../config/apiUrls';
import { AppProvider } from '../context/AppContext';
import { EventProvider } from '../context/EventContext';
import axiosInstance from '../axios.instances';
import { SERVER_ERROR_PATH, SIGNIN_PATH } from '../config/urls';
import PublicUsersRoutes from './PublicUsers';
import RegisteredUsersRoutes from './RegisteredUsers';
import EventOrganizersRoutes from './EventOrganizers';
import ServerError from './Errors/ServerError';
import NotFound from './Errors/NotFound';
import { ERROR_UNAUTHORIZED } from '../config/errorCode';

/**
 * all path routes that app can handle
 * NOTE: important to put NotFound page in the last index of appRoutes
 */
const appRoutes = [...PublicUsersRoutes, ...EventOrganizersRoutes, ...RegisteredUsersRoutes, ServerError, NotFound];

const InitRenderRoutes = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [appInitialContextValue, setAppInitialContextValue] = useState<AppContext.IState>();
  const history = useHistory();

  useEffect(() => {
    const accessToken = localStorage.accessToken.get();
    if (accessToken && accessToken !== 'null') {
      axiosInstance
        .post(SIGNIN_API, { strategy: 'jwt', accessToken })
        .then(({ data }) =>
          setAppInitialContextValue({
            auth: true,
            accessToken: data.accessToken,
            user: data.user
          })
        )
        .catch((error: AxiosError) => {
          if (localStorage.accessToken.isExist()) {
            localStorage.accessToken.remove();
          }
          // eslint-disable-next-line no-console
          console.error(error);
          if (error?.code && String(error.code) === ERROR_UNAUTHORIZED) {
            history.push(SIGNIN_PATH);
          } else {
            history.push(SERVER_ERROR_PATH);
          }
        })
        .finally(() => {
          setTimeout(() => {
            setIsAuthenticating(false);
          }, 300);
        });
    } else {
      setTimeout(() => {
        setIsAuthenticating(false);
      }, 300);
    }
  }, [history]);

  return isAuthenticating ? (
    <LoadingApp width="100vw" height="100vh" />
  ) : (
    <AppProvider key="eventpublish-context-provider" initialState={appInitialContextValue}>
      <EventProvider key="eventpublish-context-provider" initialState={appInitialContextValue}>
        <Switch>
          {appRoutes.map((route, i) => {
            if (route.auth) {
              if (route.layout === 'event-organizer') {
                return <EventOrganizerRoute {...route} key={i} />;
              }
              return <RegisteredUserRoute {...route} key={i} />;
            }
            if (route.layout === 'plain') {
              return <PlainRoute {...route} key={i} />;
            }
            return <PublicUserRoute {...route} key={i} />;
          })}
        </Switch>
      </EventProvider>
    </AppProvider>
  );
};

export default InitRenderRoutes;
