import loadable from '@loadable/component';
import { SIGNUP_PATH } from '../../../config/urls';

const SignUpView = loadable(() => import(/* webpackChunkName: "sign-up-view" */ './SignUpView'));

const SignUpRoute: IRouteProps = {
  path: SIGNUP_PATH,
  component: SignUpView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default SignUpRoute;
