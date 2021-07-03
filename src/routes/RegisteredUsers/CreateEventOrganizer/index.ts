import loadable from '@loadable/component';
import { CREATE_EVENT_ORGANIZER_PATH } from '../../../config/urls';

const CreateEventOrganizerView = loadable(
  () => import(/* webpackChunkName: "create-event-organizer-view" */ './CreateEventOrganizerView')
);

const CreateEventOrganizerRoute: IRouteProps = {
  path: CREATE_EVENT_ORGANIZER_PATH,
  component: CreateEventOrganizerView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'registered-user'
};

export default CreateEventOrganizerRoute;
