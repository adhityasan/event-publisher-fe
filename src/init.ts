import { GOOGLE_API_KEY } from './config/app';
import localStorage from './utils/localStorage/index';

// initial or update localStorage data
export const initLocalStorage = (): void => {
  const init = () => {
    localStorage.clear();
    localStorage.initiated.init();
  };

  // schedule to reset all saved localStorage data in the client browser
  const resetSchedule: string | undefined = process.env.REACT_APP_SCHEDULE_RESET_LOCALSTORAGE;

  if (resetSchedule) {
    const resetDate = new Date(resetSchedule);
    const currentDate = new Date();
    if (currentDate.getTime() > resetDate.getTime()) {
      init();
      return;
    }
  }

  // clear saved localStorage data on first visit
  if (!localStorage.initiated.isExist()) {
    init();
    return;
  }

  // update localStorage.initiated.last_visit property
  const lastVisit = new Date().getTime();
  const existInitiated = localStorage.initiated.get();

  localStorage.initiated.set({
    ...existInitiated,
    last_visit: lastVisit
  });
};

// Load google map api from googleapis.com
const loadGoogleMapAPI = () => {
  const script = document.createElement('script');

  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
  script.async = true;

  document.body.appendChild(script);
};

// export default function that will run the while initiator function
export default function (): void {
  initLocalStorage();
  loadGoogleMapAPI();
}
