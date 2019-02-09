import { fromJS } from 'immutable';
import {
  LOAD_USERS,
  USERS_LOADED,
  USER_DATA_LOADED,
  USERS_ROLES_LOADED,
  LOAD_USER_DATA,
  CURRENT_USER_INFO_LOADED, STOP_LISTEN_USERS,
} from './constants';

const initialState = fromJS({
  data: {
    users: [],
    roles: [],
  },
  userData: {},
  currentUserInfo: {},
  loading: true,
  loadUser: false,
});

const loadUsers = (state) => {
  return state
    .set('loading', true);
};

const loadUserData = (state) => {
  return state
    .set('loadUser', true);
};

const userDataLoaded = (state, data) => {
  return state
    .set('userData', data)
    .set('loadUser', false);
};

const usersLoaded = (state, data) => {
  return state
    .set('data', fromJS(data));
};

const usersRolesLoaded = (state, payload) => {
  return state.setIn(['data', 'roles'], payload);
};

const currentUserInfoLoaded = (state, { userInfo }) => {
  return state.set('currentUserInfo', fromJS(userInfo)).set('loading', false);
};

// вернуть в начальные данные после потери авторизации
const onUnsubscribeUsers = () => {
  return initialState;
};

export const storeName = 'users';

export default {
  [storeName]: (state = initialState, action) => {
    switch (action.type) {
      case LOAD_USERS:
        return loadUsers(state);
      case LOAD_USER_DATA:
        return loadUserData(state);
      case USERS_LOADED:
        return usersLoaded(state, action.payload);
      case USER_DATA_LOADED:
        return userDataLoaded(state, action.payload);
      case USERS_ROLES_LOADED:
        return usersRolesLoaded(state, action.payload);
      case CURRENT_USER_INFO_LOADED:
        return currentUserInfoLoaded(state, action.payload);
      case STOP_LISTEN_USERS:
        return onUnsubscribeUsers();
      default:
        return state;
    }
  }
};
