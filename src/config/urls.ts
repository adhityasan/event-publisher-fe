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
export const DETAIL_EVENT_ORGANIZER_NO_ID_PATH = '/event-organizer/detail/';
export const DETAIL_EVENT_ORGANIZER_PATH = DETAIL_EVENT_ORGANIZER_NO_ID_PATH + ':eventOrganizerId';
export const CREATE_EVENT_ORGANIZER_PATH = '/event-organizer/create';
export const EVENT_REGISTRATION_PATH = '/event/:eventId/registration';
export const SIGNOUT_PATH = '/signout';
export const SAVED_EVENTS_PATH = '/events/saved';
export const NOTIFICATION_PATH = '/notification';

// Event Organizer Paths
export const EO_PATH = '/eo';
export const EO_ID_PATH = EO_PATH + '/:eoId';
export const EO_DASHBOARD_PATH = EO_ID_PATH + '/dashboard';
export const EO_EVENT_CREATE_PATH = EO_ID_PATH + '/event/create';
export const EO_EVENT_UPDATE_PATH = EO_ID_PATH + '/event/update/:eventId';
export const EO_EVENT_PREVIEW_PATH = EO_ID_PATH + '/event/upcoming';
export const EO_EVENT_DRAFTED_PATH = EO_ID_PATH + '/event/drafted';
export const EO_EVENT_UPCOMING_PATH = EO_ID_PATH + '/event/upcoming';
export const EO_EVENT_PASSED_PATH = EO_ID_PATH + '/event/passed';
export const EO_COMMITTEE_LIST_PATH = EO_ID_PATH + '/committee/list';
export const EO_COMMITTEE_INVITE_PATH = EO_ID_PATH + '/committee/invite';
export const EO_CERTIFICATION_PATH = EO_ID_PATH + '/certification';
export const EO_PREVIEW_PATH = EO_ID_PATH + '/preview';
export const EO_SETTINGS_PATH = EO_ID_PATH + '/settings';

// Error Paths
export const NOT_FOUND_PATH = '*';
export const SERVER_ERROR_PATH = '/500';
