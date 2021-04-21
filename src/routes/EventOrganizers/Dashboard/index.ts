import { EO_DASHBOARD_PATH } from '../../../config/urls';
import DashboardView from './DashboardView';

const SignOutRoute: IRouteProps = {
  path: EO_DASHBOARD_PATH,
  component: DashboardView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default SignOutRoute;
