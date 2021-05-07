import loadable from '@loadable/component';
import { EO_EVENT_DRAFTED_PATH } from '../../../config/urls';

const DraftedEventsView = loadable(() => import(/* webpackChunkName: "drafted-events-view" */ './DraftedEventsView'));

const draftedEventRoute: IRouteProps = {
  path: EO_EVENT_DRAFTED_PATH,
  component: DraftedEventsView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default draftedEventRoute;
