import { SIGNOUT_PATH } from '../../../config/urls';
import SignoutView from './SignoutView';

const SignOutRoute: IRouteProps = {
  path: SIGNOUT_PATH,
  component: SignoutView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default SignOutRoute;
