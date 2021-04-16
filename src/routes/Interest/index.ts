import { INTEREST_PATH } from '../../config/urls';
import InterestView from './InterestView';

const NotFoundRoute: IRouteProps = {
  path: INTEREST_PATH,
  component: InterestView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default NotFoundRoute;
