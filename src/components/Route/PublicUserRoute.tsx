import React from 'react';
import { Route } from 'react-router-dom';
import PublicLayout from '../../layouts/PublicLayout';

const PublicUserRoute = ({ component: Component, ...rest }: IRouteProps) => (
  <Route
    {...rest}
    render={(props) => (
      <PublicLayout>
        <Component {...props} />
      </PublicLayout>
    )}
  />
);

export default PublicUserRoute;
