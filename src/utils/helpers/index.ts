import { API_URL } from '../../config/app';
import localStorage from '../localStorage';

export const isObject = (variable: any): boolean => !!variable && variable.constructor === Object;

export const isArray = (variable: any): boolean => !!variable && variable.constructor === Array;

export const isNumber = (variable: any): boolean => !!variable && variable.constructor === Number;

export const isString = (variable: any): boolean => typeof variable === 'string' || variable instanceof String;

export const isUndefinedNull = (variable: any): boolean => variable === null || variable === undefined;

export const getBase64 = (img: any, callback: (readerRes: any) => void): void => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const setPictureUrl = (fileId: string): string => {
  return `${API_URL}/uploads/${fileId}`;
};

interface ISelectOption {
  label: string;
  value: any;
}

export const setSelectOptions = (data: any[], labelField: string, valueField: string): ISelectOption[] => {
  const options: ISelectOption[] = data.map((val) => ({
    label: val[labelField],
    value: val[valueField]
  }));
  return options;
};

export const getLocation = (successHandler: (position: any) => void, errorHandler: (error: any) => void): void => {
  if (!navigator.geolocation) {
    window.alert('Geolocation is not supported by this browser.');
  } else {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }
};

export const reversedGeocode = (
  geocoder: google.maps.Geocoder,
  geolocation: { lat: number; lng: number },
  callback: (formattedAddress: string) => void
): void => {
  geocoder.geocode({ location: geolocation }, (results: any, status: google.maps.GeocoderStatus) => {
    if (status === 'OK') {
      if (results[0]) {
        if (callback) {
          callback(results[0].formatted_address);
        }
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
};

type RequestLocationCallback = (
  arg0: {
    lng: number;
    lat: number;
  },
  arg1: string
) => void;

// ask current user location from the browser
export const requestUserLocation = (callback?: RequestLocationCallback): void => {
  getLocation(
    (position: any) => {
      if (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (!localStorage?.geolocation?.isExist()) {
          localStorage.geolocation?.init();
        }
        if (!localStorage.location.isExist()) {
          localStorage.location.init();
        }

        const geocoder = new google.maps.Geocoder();
        reversedGeocode(geocoder, { lat, lng }, (formattedAddress) => {
          localStorage.location.set(formattedAddress);
          if (callback) {
            callback({ lng, lat }, formattedAddress);
          }
        });
        localStorage.geolocation.set({ lat, lng });
      }
    },
    (error: any) => {
      localStorage.geolocation.remove();
      // eslint-disable-next-line no-console
      console.error(error);
    }
  );
};
