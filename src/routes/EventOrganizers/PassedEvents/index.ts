import loadable from '@loadable/component';
import { EO_EVENT_PASSED_PATH } from '../../../config/urls';

const PassedEventsView = loadable(() => import(/* webpackChunkName: "passed-events-view" */ './PassedEventsView'));

const passedEventRoute: IRouteProps = {
  path: EO_EVENT_PASSED_PATH,
  component: PassedEventsView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default passedEventRoute;
