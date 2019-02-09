import React from 'react';
import { withRouter } from 'react-router-dom';
import { ROUTE_SIGN_IN } from '../../constants/routes';

export class WithAuthorizationComponent extends React.Component {
  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged((authUser) => {
      const { history } = this.props;
      
      // пускать без авторизации на смену пароля
      if (!authUser) {
        history.push(ROUTE_SIGN_IN);
      }
    });
  }
  
  render() {
    return (
      this.props.children
    );
  }
}

export const withAuthorizationHoc = (Component) => {
  const WithAuthorization = props => (
    <WithAuthorizationComponent {...props}>
      <Component {...props} />
    </WithAuthorizationComponent>
  );
  
  return withRouter(WithAuthorization);
};
