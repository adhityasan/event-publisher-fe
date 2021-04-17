import { NOT_FOUND_PATH } from '../../../config/urls';
import NotFoundView from './NotFoundView';

const NotFoundRoute: IRouteProps = {
  path: NOT_FOUND_PATH,
  component: NotFoundView,
  exact: false,
  strict: false,
  auth: false,
  layout: 'plain'
};

export default NotFoundRoute;
