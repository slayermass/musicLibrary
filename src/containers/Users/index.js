import { connect } from 'react-redux';
import { convertFromImmutableToJS } from '../../helpers/common';
import {
  blockUser, deleteUser, loadUserData, updateUser
} from './actions';
import { storeName } from './reducer';
import { UsersContainer } from './container';

const mapStateToProps = (state) => {
  return {
    usersData: convertFromImmutableToJS(state.getIn([storeName, 'data'])),
    userData: convertFromImmutableToJS(state.getIn([storeName, 'userData'])),
    loading: state.getIn([storeName, 'loading']),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    blockUser: (id, isBlock) => {
      dispatch(blockUser(id, isBlock));
    },
    deleteUser: (id) => {
      dispatch(deleteUser(id));
    },
    updateUser: (data) => {
      dispatch(updateUser(data));
    },
    loadUserData: (id) => {
      dispatch(loadUserData(id));
    },
  };
};

export const Users = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
