import loadable from '@loadable/component';
import { EO_CERTIFICATION_PATH } from '../../../config/urls';

const CreateEventView = loadable(() => import(/* webpackChunkName: "create-event-view" */ './CertificationsView'));

const CertificationsRoute: IRouteProps = {
  path: EO_CERTIFICATION_PATH,
  component: CreateEventView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default CertificationsRoute;
