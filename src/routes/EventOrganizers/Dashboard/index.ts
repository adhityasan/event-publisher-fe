import loadable from '@loadable/component';
import { EO_DASHBOARD_PATH } from '../../../config/urls';

const DashboardView = loadable(() => import(/* webpackChunkName: "dashboard-view" */ './DashboardView'));

const dashboardRoute: IRouteProps = {
  path: EO_DASHBOARD_PATH,
  component: DashboardView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default dashboardRoute;
