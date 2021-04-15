import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { SIGNIN_PATH } from '../../config/urls';
import { useAppContext } from '../../context/AppContext';
import RegisteredLayout from '../../layouts/RegisteredLayout';

const RegisteredUserRoute = ({ component: Component, ...rest }: IRouteProps) => {
  const { appState } = useAppContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        appState.auth ? (
          <RegisteredLayout>
            <Component {...props} />
          </RegisteredLayout>
        ) : (
          <Redirect
            to={{
              pathname: SIGNIN_PATH,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default RegisteredUserRoute;
