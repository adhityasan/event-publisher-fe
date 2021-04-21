import { EO_EVENT_DRAFTED_PATH } from '../../../config/urls';
import DraftedEventsView from './DraftedEventsView';

const draftedEventRoute: IRouteProps = {
  path: EO_EVENT_DRAFTED_PATH,
  component: DraftedEventsView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default draftedEventRoute;
