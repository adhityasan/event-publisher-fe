import { EO_COMMITTEE_INVITE_PATH } from '../../../config/urls';
import InviteCommitteeView from './InviteCommitteeView';

const draftedEventRoute: IRouteProps = {
  path: EO_COMMITTEE_INVITE_PATH,
  component: InviteCommitteeView,
  exact: true,
  strict: false,
  auth: true,
  layout: 'event-organizer'
};

export default draftedEventRoute;
