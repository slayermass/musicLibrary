import { fromJS } from 'immutable';
import {
  CLEAR_ALERTS,
  PUSH_ALERT,
} from './constants';
import { convertFromImmutableToJS } from '../../../helpers/common';

const initialState = fromJS({
  alerts: [],
});

const pushAlert = (state, payload) => {
  const alerts = [...convertFromImmutableToJS(state).alerts];
  alerts.push(payload);
  
  return state
    .set('alerts', fromJS(alerts));
};

const clearAlerts = (state) => {
  return state.set('alerts', []);
};

export const storeName = 'alerts';

export default {
  [storeName]: (state = initialState, action) => {
    switch (action.type) {
      case PUSH_ALERT:
        return pushAlert(state, action.payload);
      case CLEAR_ALERTS:
        return clearAlerts(state);
      default:
        return state;
    }
  }
};
