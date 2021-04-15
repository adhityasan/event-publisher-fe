export const isObject = (variable: any): boolean => !!variable && variable.constructor === Object;

export const isArray = (variable: any): boolean => !!variable && variable.constructor === Array;

export const isNumber = (variable: any): boolean => !!variable && variable.constructor === Number;

export const isString = (variable: any): boolean => typeof variable === 'string' || variable instanceof String;

export const isUndefinedNull = (variable: any): boolean => variable === null || variable === undefined;
