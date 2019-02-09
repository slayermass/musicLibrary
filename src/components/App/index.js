import React from 'react';
import { Firebase, withFirebase } from '../Firebase';
import { AuthUserContext, withAuthentication, withAuthorizationHoc } from '../Session';
import { Main } from '../Main';
import { OuterLayout } from '../OuterLayout';
import { WithAlerts } from '../../containers/HOC/Alerts';
import './styles.css';

// AuthUserContext устарел(но используется), использовать Firebase().auth.currentUser
const AppComponent = props => (
  <div className="app">
    <AuthUserContext.Consumer>
      {authUser => (
        authUser && Firebase().auth.currentUser
          ? <Main {...props} />
          : <OuterLayout {...props} />
      )}
    </AuthUserContext.Consumer>
  </div>
);

export const App = withFirebase(withAuthentication(withAuthorizationHoc(WithAlerts(AppComponent))));
