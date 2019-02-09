// @flow
import moment from 'moment';
import {
  DATE_SHOW_FORMAT,
  DATE_PRIMARY_FORMAT,
} from '../constants/date';

export const getDateBySeconds = (seconds: number) => {
  return moment.unix(seconds).format(DATE_SHOW_FORMAT);
};

export const getDateByFormat = (date: string, format: string = DATE_PRIMARY_FORMAT) => {
  return moment(date).format(format);
};
