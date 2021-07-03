import loadable from '@loadable/component';
import { INTEREST_PATH } from '../../../config/urls';

const InterestView = loadable(() => import(/* webpackChunkName: "interest-view" */ './InterestView'));

const NotFoundRoute: IRouteProps = {
  path: INTEREST_PATH,
  component: InterestView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default NotFoundRoute;
