import { API_URL } from '../../config/app';

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
