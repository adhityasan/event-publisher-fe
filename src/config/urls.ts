// Public Users Paths
export const HOME_PATH = '/';
export const SIGNIN_PATH = '/signin';
export const SIGNUP_PATH = '/signup';
export const ABOUT_PATH = '/about';
export const SEARCH_EVENT_PATH = '/events';
export const DETAIL_EVENT_PATH = '/event/:eventId';
export const EMAIL_VERIFICATION_PATH = '/email-verification';

// Registered Users Paths
export const INTEREST_PATH = '/interest';
export const RECOMMENDATION_EVENTS_PATH = '/events/recommendation';
export const ACCOUNT_SETTING_PATH = '/account/settings';
export const PROFILE_PATH = '/profile';
export const UPDATE_PROFILE_PATH = '/profile/update';
export const USER_PROFILE_PATH = '/users/profile/:userId';
export const LIST_EVENT_ORGANIZER_PATH = '/event-organizer/list';
export const CREATE_EVENT_ORGANIZER_PATH = '/event-organizer/create';
export const EVENT_REGISTRATION_PATH = '/event/:eventId/registration';
export const SIGNOUT_PATH = '/signout';
export const SAVED_EVENTS_PATH = '/events/saved';
export const NOTIFICATION_PATH = '/notification';

// Event Organizer Paths
export const EO_PATH = '/eo';
export const EO_DASHBOARD_PATH = EO_PATH + '/dashboard';
export const EO_LIST_EVENT_PATH = EO_PATH + '/event/list';
export const EO_CREATE_EVENT_PATH = EO_PATH + '/event/create';
export const EO_UPDATE_EVENT_PATH = EO_PATH + '/event/:eventId/update';
export const EO_CERTIFY_EVENT_PATH = EO_PATH + '/event/:eventId/certify';
export const EO_COMMITTEE_PATH = EO_PATH + '/committee';

// Error Paths
export const NOT_FOUND_PATH = '*';
export const SERVER_ERROR_PATH = '/500';
