import React from 'react';
import { Switch } from 'react-router-dom';
import { EventOrganizerRoute, PublicUserRoute, RegisteredUserRoute } from '../components/Route';
import { AppProvider } from '../context/AppContext';
import Home from './Home';
import NotFound from './NotFound';
import About from './About';
import SignIn from './SignIn';
import SignUp from './SignUp';
import SearchEvent from './SearchEvent';

const appRoutes = [Home, About, SignIn, SignUp, SearchEvent, NotFound];

const initRenderRoutes = () => (
  <AppProvider>
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

export default initRenderRoutes;
