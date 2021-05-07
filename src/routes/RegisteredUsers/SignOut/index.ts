import loadable from '@loadable/component';
import { SIGNOUT_PATH } from '../../../config/urls';

const SignoutView = loadable(() => import(/* webpackChunkName: "sign-out-view" */ './SignoutView'));

const SignOutRoute: IRouteProps = {
  path: SIGNOUT_PATH,
  component: SignoutView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default SignOutRoute;
