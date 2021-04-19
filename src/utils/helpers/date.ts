import dayjs from 'dayjs';

export const toCommonDate = (unixDate: number): string => {
  return dayjs.unix(unixDate).format('DD, MMM YYYY');
};
