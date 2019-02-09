// @flow
import React from 'react';
import { connect } from 'react-redux';
import { CircularLoader } from '../../components/CircularLoader';
import { CreateReviewComponent } from '../../components/CreateReview';
import { loadReviewAction, saveReviewAction } from '../Reviews/actions';
import { convertFromImmutableToJS } from '../../helpers/common';
import { storeName } from '../Reviews/reducer';
import type { ReviewType } from '../../models/review.flowtypes';

type Props = {
  loadingReview: boolean,
  saveReview: () => void,
  loadReview: (s: string) => void,
  match: {
    params: {
      reviewId?: string,
    }
  },
  review: ReviewType,
}

export class CreateReviewContainer extends React.PureComponent<Props> {
  componentDidMount(): void {
    const { loadReview, match: { params: { reviewId } } } = this.props;
  
    if (reviewId) {
      loadReview(reviewId);
    }
  }
  
  render() {
    const {
      loadingReview, saveReview, review, match: { params: { reviewId } },
    } = this.props;
    
    return (
      <div className="content-wrapper">
        {
          loadingReview
            ? <CircularLoader />
            : (
              <CreateReviewComponent
                saveReview={saveReview}
                review={review}
                reviewId={reviewId}
              />
            )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    review: convertFromImmutableToJS(state.getIn([storeName, 'review'])),
    loadingReview: state.getIn([storeName, 'loadingReview']),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveReview: (data) => {
      dispatch(saveReviewAction(ownProps.match.params.reviewId, data));
    },
    loadReview: (reviewId) => {
      dispatch(loadReviewAction(reviewId));
    }
  };
};

export const CreateReview = connect(mapStateToProps, mapDispatchToProps)(CreateReviewContainer);
