import { fromJS } from 'immutable';
import { LOAD_REVIEW, REVIEW_LOADED, REVIEWS_LOADED } from './constants';

const initialState = fromJS({
  reviews: [],
  review: {},
  loading: true,
  loadingReview: false,
});

const loadReview = (state) => {
  return state
    .set('loadingReview', true);
};

const reviewsLoaded = (state, { reviews }) => {
  return state
    .set('reviews', fromJS(reviews))
    .set('loading', false);
};

const reviewLoaded = (state, { review }) => {
  return state
    .set('review', fromJS(review))
    .set('loadingReview', false);
};

export const storeName = 'reviews';

export default {
  [storeName]: (state = initialState, action) => {
    switch (action.type) {
      case LOAD_REVIEW:
        return loadReview(state);
      case REVIEWS_LOADED:
        return reviewsLoaded(state, action.payload);
      case REVIEW_LOADED:
        return reviewLoaded(state, action.payload);
      default:
        return state;
    }
  }
};
