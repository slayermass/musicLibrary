import {
  SET_MAIN_TITLE,
  CLEAR_MAIN_TITLE
} from './constants';

export const storeName = 'mainTitle';
const initialState = {
  title: null
};

export default {
  [storeName]: (state = initialState, action) => {
    switch (action.type) {
      case SET_MAIN_TITLE:
        return {
          ...state,
          title: action.payload
        };
      case CLEAR_MAIN_TITLE:
        return {
          ...state,
          title: null
        };
      default:
        return state;
    }
  }
};
