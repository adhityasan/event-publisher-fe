import loadable from '@loadable/component';
import { EO_COMMITTEE_INVITE_PATH } from '../../../config/urls';

const InviteCommitteeView = loadable(() => import(/* webpackChunkName: "invite-committee-view" */ './InviteCommitteeView'));

const draftedEventRoute: IRouteProps = {
  path: EO_COMMITTEE_INVITE_PATH,
  component: InviteCommitteeView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default draftedEventRoute;
