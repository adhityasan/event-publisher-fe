import { LIST_EVENT_ORGANIZER_PATH } from '../../../config/urls';
import ListEventOrganizerView from './ListEventOrganizerView';

const SignOutRoute: IRouteProps = {
  path: LIST_EVENT_ORGANIZER_PATH,
  component: ListEventOrganizerView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default SignOutRoute;
