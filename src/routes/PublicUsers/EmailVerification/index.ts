import { EMAIL_VERIFICATION_PATH } from '../../../config/urls';
import EmailVerificationView from './EmailverificationView';

const EmailVerificationRoute: IRouteProps = {
  path: EMAIL_VERIFICATION_PATH,
  component: EmailVerificationView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default EmailVerificationRoute;
