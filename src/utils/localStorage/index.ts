import { APP_NAME } from '../../config/app';

import LocalStorageEntry from './entry';

const STORAGE_KEYS = {
  initiated: `${APP_NAME}.initiated`,
  token: `${APP_NAME}.token`,
  notification: `${APP_NAME}.notification`,
  geolocation: `${APP_NAME}.geolocation`,
  location: `${APP_NAME}.location`
};

export const INITIAL_LOCAL_STORAGE = {
  app_name: APP_NAME,
  last_visit: new Date().getTime()
};

class LocalStorage {
  // RESET METHOD
  clear(): void {
    window.localStorage.clear();
  }
  // INITIATE
  initiated = new LocalStorageEntry({
    key: STORAGE_KEYS.initiated,
    defaultValue: INITIAL_LOCAL_STORAGE
  });
  // TOKEN
  token = new LocalStorageEntry({ key: STORAGE_KEYS.token, defaultValue: '' });
  // NOTIFICATION
  notification = new LocalStorageEntry({ key: STORAGE_KEYS.notification, defaultValue: null });
  // GEOLOCATION
  geolocation = new LocalStorageEntry({ key: STORAGE_KEYS.geolocation, defaultValue: null });
  // LOCATION
  location = new LocalStorageEntry({ key: STORAGE_KEYS.location, defaultValue: '' });
}

export default new LocalStorage();
