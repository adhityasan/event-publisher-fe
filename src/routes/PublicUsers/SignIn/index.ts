import loadable from '@loadable/component';
import { SIGNIN_PATH } from '../../../config/urls';

const SignInView = loadable(() => import(/* webpackChunkName: "sign-in-view" */ './SignInView'));

const SignInRoute: IRouteProps = {
  path: SIGNIN_PATH,
  component: SignInView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user',
  restricted: true
};

export default SignInRoute;
