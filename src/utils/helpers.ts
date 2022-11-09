import jwtDecode from 'jwt-decode';
import { startOfDay, format as fDate, isValid } from 'date-fns';
import { isNumber } from 'lodash';

export const reOrder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const { exp } = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return exp > currentTime;
};

export const convertDateToTimeStamp = (date: any) => {
  if (!date || !isValid(date)) return date;
  const converted = startOfDay(date).getTime() / 1000;
  return converted;
};

export const convertTimeStampToDate = (
  value: number | string | undefined,
  format?: string
) => {
  if (!value) return value;
  const parseNum = isNumber(value) ? value : parseFloat(value);
  const _date = new Date(parseNum * 1000);
  if (format) return fDate(_date, format);
  return _date;
};

export const formatNumber = (
  value: string | number | undefined,
  digit?: number
) => {
  if (!value) return value;
  const _value = isNumber(value) ? value : parseFloat(value);
  return _value.toLocaleString('en', {
    maximumFractionDigits: digit !== undefined ? digit : 2,
  });
};
