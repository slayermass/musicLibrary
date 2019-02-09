import { combineReducers } from 'redux-immutable';
import reviewsReducer from './containers/Reviews/reducer';
import alertsReducer from './containers/HOC/Alerts/reducer';

const appReducer = combineReducers({
  ...reviewsReducer,
  ...alertsReducer,
});

export default (state, action) => {
  return appReducer(state, action);
};
