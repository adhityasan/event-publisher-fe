import { HOME_PATH } from '../../../config/urls';
import HomeView from './HomeView';

const HomeRoute: IRouteProps = {
  path: HOME_PATH,
  component: HomeView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default HomeRoute;
