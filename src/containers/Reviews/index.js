import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { CircularLoader } from '../../components/CircularLoader';
import { convertFromImmutableToJS } from '../../helpers/common';
import { deleteReviewAction } from './actions';
import { storeName } from './reducer';
import { ReviewsComponent } from '../../components/Reviews';
import { SearchBar } from '../../components/Reviews/searchBar';

export class ReviewsContainer extends PureComponent {
  state = {
    filter: {},
  };
  
  onSearch = (data) => {
    this.setState({
      filter: data,
    });
  };
  
  render() {
    const { loading, reviews, deleteReview } = this.props;
    const { filter } = this.state;
  
    let filteredReviews = [...reviews];
  
    Object.entries(filter).forEach((d) => {
      if (d[1].length && !(d[0] === 'rating' && d[1] === '0')) {
        filteredReviews = filteredReviews.filter((u) => {
          if (typeof u[d[0]] === 'number') {
            return u[d[0]] === parseInt(d[1], 10);
          }
          return u[d[0]].toLowerCase().includes(d[1].toLowerCase());
        });
      }
    });
    
    return (
      <div className="content-wrapper">
        <Paper>
          <SearchBar onSearch={this.onSearch} />
          {
            loading
              ? <CircularLoader />
              : (
                <ReviewsComponent
                  reviews={filteredReviews}
                  deleteReview={deleteReview}
                />
              )
          }
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: convertFromImmutableToJS(state.getIn([storeName, 'reviews'])),
    loading: state.getIn([storeName, 'loading']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteReview: (reviewId) => {
      dispatch(deleteReviewAction(reviewId));
    }
  };
};

export const Reviews = connect(mapStateToProps, mapDispatchToProps)(ReviewsContainer);
