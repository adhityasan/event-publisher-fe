import loadable from '@loadable/component';
import { EO_COMMITTEE_LIST_PATH } from '../../../config/urls';

const CommitteeListView = loadable(() => import(/* webpackChunkName: "drafted-events-view" */ './CommitteeListView'));

const committeeListRoute: IRouteProps = {
  path: EO_COMMITTEE_LIST_PATH,
  component: CommitteeListView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default committeeListRoute;
