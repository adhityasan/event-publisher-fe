import loadable from '@loadable/component';
import { LIST_EVENT_ORGANIZER_PATH } from '../../../config/urls';

const ListEventOrganizerView = loadable(
  () => import(/* webpackChunkName: "list-event-organizer-view" */ './ListEventOrganizerView')
);

const SignOutRoute: IRouteProps = {
  path: LIST_EVENT_ORGANIZER_PATH,
  component: ListEventOrganizerView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default SignOutRoute;
