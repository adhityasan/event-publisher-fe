import loadable from '@loadable/component';
import { EMAIL_VERIFICATION_PATH } from '../../../config/urls';

const EmailVerificationView = loadable(() => import(/* webpackChunkName: "email-verification-view" */ './EmailverificationView'));

const EmailVerificationRoute: IRouteProps = {
  path: EMAIL_VERIFICATION_PATH,
  component: EmailVerificationView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default EmailVerificationRoute;
