import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SIGNIN_AS_EO_PATH } from '../../config/urls';
import { useAppContext } from '../../context/AppContext';
import EventOrganizerLayout from '../../layouts/EventOrganizerLayout';

const EventOrganizerRoute = ({ component: Component, ...rest }: IRouteProps) => {
  const { appState } = useAppContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        appState.auth ? (
          <EventOrganizerLayout>
            <Component {...props} />
          </EventOrganizerLayout>
        ) : (
          <Redirect
            to={{
              pathname: SIGNIN_AS_EO_PATH,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default EventOrganizerRoute;
