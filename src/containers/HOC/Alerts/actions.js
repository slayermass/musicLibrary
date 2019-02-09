// @flow
import {
  CLEAR_ALERTS,
  PUSH_ALERT,
} from './constants';

export type PushAlertType = (o: {
  message: string,
  variant: 'error' | 'success' | 'info'
}) => any;

// поместить в хранилище информацию для глобального вывода
export const pushAlert: PushAlertType = (payload) => {
  return {
    type: PUSH_ALERT,
    payload,
  };
};

export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS
  };
};
