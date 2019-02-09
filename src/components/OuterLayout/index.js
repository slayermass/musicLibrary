import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ROUTE_SIGN_IN, ROUTE_SIGN_UP } from '../../constants/routes';
import SignUp from '../SignUp';
import { SignInPage } from '../SignIn';
import './styles.css';

export class OuterLayout extends Component {
  render() {
    return (
      <main className="outer-layout">
        <Switch>
          <Route
            exact
            path={ROUTE_SIGN_UP}
            component={SignUp}
          />
          <Route
            exact
            path={ROUTE_SIGN_IN}
            component={SignInPage}
          />
        </Switch>
      </main>
    );
  }
}
