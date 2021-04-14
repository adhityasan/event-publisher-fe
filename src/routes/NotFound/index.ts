import NotFoundView from './NotFoundView';

const NotFoundRoute: IRouteProps = {
  path: '*',
  component: NotFoundView,
  exact: false,
  strict: false,
  auth: false,
  layout: 'public-user'
};

export default NotFoundRoute;
