import React from 'react';
import { Route } from 'react-router-dom';
import PlainLayout from '../../layouts/PlainLayout';

const RegisteredUserRoute = ({ component: Component, ...rest }: IRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <PlainLayout>
          <Component {...props} />
        </PlainLayout>
      )}
    />
  );
};

export default RegisteredUserRoute;
