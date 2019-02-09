import {
  SET_MAIN_TITLE,
  CLEAR_MAIN_TITLE
} from './constants';

export const setMainTitle = (payload) => {
  return {
    type: SET_MAIN_TITLE,
    payload,
  };
};

export const clearMainTitle = () => {
  return { type: CLEAR_MAIN_TITLE };
};
