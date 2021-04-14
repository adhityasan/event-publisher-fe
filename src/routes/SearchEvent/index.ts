import { SEARCH_EVENT_PATH } from '../../config/urls';
import SearchEventView from './SearchEventView';

const SearchEventRoute: IRouteProps = {
  path: SEARCH_EVENT_PATH,
  component: SearchEventView,
  exact: true,
  strict: true,
  auth: false,
  layout: 'public-user'
};

export default SearchEventRoute;
