import loadable from '@loadable/component';
import { EO_EVENT_CREATE_PATH } from '../../../config/urls';

const CreateEventView = loadable(() => import(/* webpackChunkName: "create-event-view" */ './CreateEventView'));

const CreateEventRoute: IRouteProps = {
  path: EO_EVENT_CREATE_PATH,
  component: CreateEventView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default CreateEventRoute;
