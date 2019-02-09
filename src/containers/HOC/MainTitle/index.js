import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  setMainTitle as setMainTitleAction,
  clearMainTitle as clearMainTitleAction,
} from './actions';
import { convertFromImmutableToJS } from '../../../helpers/common';
import { storeName } from './reducer';

const mapStateToProps = state => ({
  mainTitle: convertFromImmutableToJS(state.getIn([storeName, 'title'])),
});

const mapDispatchToProps = dispatch => ({
  setMainTitle: (title) => {
    dispatch(setMainTitleAction(title));
  },
  clearMainTitle: (title) => {
    dispatch(clearMainTitleAction(title));
  },
});

class MainTitleWrapper extends PureComponent {
  componentWillUnmount() {
    this.props.clearMainTitle();
  }

  render() {
    return this.props.children;
  }
}

export const WithTitleWrapper = WrappedComponent => (props) => {
  return (
    <MainTitleWrapper {...props}>
      <WrappedComponent {...props} />
    </MainTitleWrapper>
  );
};

export const withMainTitle = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithTitleWrapper
);
