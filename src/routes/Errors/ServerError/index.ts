import { SERVER_ERROR_PATH } from '../../../config/urls';
import NotFoundView from './ServerErrorView';

const NotFoundRoute: IRouteProps = {
  path: SERVER_ERROR_PATH,
  component: NotFoundView,
  exact: false,
  strict: false,
  auth: false,
  layout: 'plain'
};

export default NotFoundRoute;
