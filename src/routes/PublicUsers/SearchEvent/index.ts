import loadable from '@loadable/component';
import { SEARCH_EVENT_PATH } from '../../../config/urls';

const SearchEventView = loadable(() => import(/* webpackChunkName: "search-event-view" */ './SearchEventView'));

const SearchEventRoute: IRouteProps = {
  path: SEARCH_EVENT_PATH,
  component: SearchEventView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default SearchEventRoute;
