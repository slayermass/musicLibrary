import React from 'react';
import AuthUserContext from './context';
import { startListenUsersAction } from '../../containers/Users/actions';
import { store } from '../../index';

const withAuthentication = (Component) => {
  return class extends React.Component {
    state = {
      authUser: null,
    };

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          if (authUser) {
            store.dispatch(startListenUsersAction());
            this.setState({ authUser });
          } else {
            this.setState({ authUser: null });
          }
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }
    
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };
};

export default withAuthentication;
