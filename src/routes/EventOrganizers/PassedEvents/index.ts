import { EO_EVENT_PASSED_PATH } from '../../../config/urls';
import UpcomingEventsView from './PassedEventsView';

const passedEventRoute: IRouteProps = {
  path: EO_EVENT_PASSED_PATH,
  component: UpcomingEventsView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default passedEventRoute;
