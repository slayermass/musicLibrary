import React from 'react';
import { connect } from 'react-redux';
import { Firebase } from '../Firebase';
import './styles.css';
import { convertFromImmutableToJS } from '../../helpers/common';
import { storeName } from '../../containers/Users/reducer';

export const HomeComponent = () => (
  <div className="content-wrapper" />
);

const mapStateToProps = (state) => {
  return {
    currentUser: convertFromImmutableToJS(state.getIn([storeName, 'data', 'users']))
      .find(u => u.id === Firebase().auth.currentUser.uid),
  };
};

export const Home = connect(mapStateToProps)(HomeComponent);
