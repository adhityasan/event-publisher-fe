import loadable from '@loadable/component';
import { HOME_PATH } from '../../../config/urls';

const HomeView = loadable(() => import(/* webpackChunkName: "home-view" */ './HomeView'));

const HomeRoute: IRouteProps = {
  path: HOME_PATH,
  component: HomeView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default HomeRoute;
