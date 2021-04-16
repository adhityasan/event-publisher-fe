import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { HOME_PATH } from '../../config/urls';
import { useAppContext } from '../../context/AppContext';
import PublicLayout from '../../layouts/PublicLayout';
import RegisteredLayout from '../../layouts/RegisteredLayout';

const PublicUserRoute = ({ component: Component, restricted, ...rest }: IRouteProps) => {
  const { appState } = useAppContext();
  const Layout = appState.auth ? RegisteredLayout : PublicLayout;
  return (
    <Route
      {...rest}
      render={(props) =>
        appState.auth && restricted ? (
          <Redirect
            to={{
              pathname: HOME_PATH,
              state: { from: props.location }
            }}
          />
        ) : (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }
    />
  );
};

export default PublicUserRoute;
