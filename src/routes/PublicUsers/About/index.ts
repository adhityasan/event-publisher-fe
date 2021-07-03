import loadable from '@loadable/component';
import { ABOUT_PATH } from '../../../config/urls';

const AboutView = loadable(() => import(/* webpackChunkName: "about-view" */ './AboutView'));

const AboutRoute: IRouteProps = {
  path: ABOUT_PATH,
  component: AboutView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default AboutRoute;
