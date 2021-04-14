import { SIGNUP_PATH } from '../../config/urls';
import SignUpView from './SignUpView';

const SignUpRoute: IRouteProps = {
  path: SIGNUP_PATH,
  component: SignUpView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default SignUpRoute;
