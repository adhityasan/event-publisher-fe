import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { EO_DASHBOARD_PATH } from '../../config/urls';
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
              pathname: EO_DASHBOARD_PATH,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default EventOrganizerRoute;
