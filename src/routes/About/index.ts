import { ABOUT_PATH } from '../../config/urls';
import AboutView from './AboutView';

const AboutRoute: IRouteProps = {
  path: ABOUT_PATH,
  component: AboutView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default AboutRoute;
