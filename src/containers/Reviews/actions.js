import {
  DELETE_REVIEW, LOAD_REVIEW, REVIEW_LOADED, REVIEWS_LOADED, SAVE_REVIEW
} from './constants';

export const reviewsLoadedAction = (reviews) => {
  return {
    type: REVIEWS_LOADED,
    payload: {
      reviews,
    },
  };
};

export const loadReviewAction = (reviewId) => {
  return {
    type: LOAD_REVIEW,
    payload: {
      reviewId,
    }
  };
};

export const reviewLoadedAction = (review) => {
  return {
    type: REVIEW_LOADED,
    payload: {
      review,
    },
  };
};

export const saveReviewAction = (reviewId, reviewData) => {
  return {
    type: SAVE_REVIEW,
    payload: {
      reviewId,
      reviewData,
    },
  };
};

export const deleteReviewAction = (reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: {
      reviewId,
    },
  };
};
