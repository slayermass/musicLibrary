import {
  USERS_LOADED,
  BLOCK_USER,
  DELETE_USER,
  CREATE_USER,
  LOAD_USER_DATA,
  USER_DATA_LOADED,
  UPDATE_USER,
  RESET_PASSWORD,
  USERS_LOAD_ROLES,
  USERS_ROLES_LOADED, CURRENT_USER_INFO_LOADED, START_LISTEN_USERS, STOP_LISTEN_USERS,
} from './constants';

export const usersLoaded = (payload) => {
  return {
    type: USERS_LOADED,
    payload
  };
};

export const blockUser = (id, isBlock) => {
  return {
    type: BLOCK_USER,
    id,
    isBlock,
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    id,
  };
};

export const createUser = (data, backUrl = false) => {
  return {
    type: CREATE_USER,
    data,
    backUrl,
  };
};

export const updateUser = (data, backUrl = false) => {
  return {
    type: UPDATE_USER,
    data,
    backUrl,
  };
};

export const loadUserData = (id) => {
  return {
    type: LOAD_USER_DATA,
    id
  };
};

export const userDataLoaded = (payload) => {
  return {
    type: USER_DATA_LOADED,
    payload
  };
};

export const resetPassword = (email) => {
  return {
    type: RESET_PASSWORD,
    email
  };
};

export const usersLoadRoles = () => {
  return {
    type: USERS_LOAD_ROLES,
  };
};

export const usersRolesLoaded = (payload) => {
  return {
    type: USERS_ROLES_LOADED,
    payload
  };
};

export const currentUserInfoLoadedAction = (userInfo) => {
  return {
    type: CURRENT_USER_INFO_LOADED,
    payload: {
      userInfo,
    },
  };
};

export const startListenUsersAction = () => {
  return {
    type: START_LISTEN_USERS,
    payload: {},
  };
};

export const stopListenUsersAction = () => {
  return {
    type: STOP_LISTEN_USERS,
    payload: {},
  };
};
