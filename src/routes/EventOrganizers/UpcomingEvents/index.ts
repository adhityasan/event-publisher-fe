import loadable from '@loadable/component';
import { EO_EVENT_UPCOMING_PATH } from '../../../config/urls';

const UpcomingEventsView = loadable(() => import(/* webpackChunkName: "upcomming-events-view" */ './UpcomingEventsView'));

const upcomingEventRoute: IRouteProps = {
  path: EO_EVENT_UPCOMING_PATH,
  component: UpcomingEventsView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default upcomingEventRoute;
