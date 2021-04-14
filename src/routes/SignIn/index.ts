import { SIGNIN_PATH } from '../../config/urls';
import SignInView from './SignInView';

const SignInRoute: IRouteProps = {
  path: SIGNIN_PATH,
  component: SignInView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default SignInRoute;
