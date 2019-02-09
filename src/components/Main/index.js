import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import { Route, Switch } from 'react-router-dom';
import { MainMenu } from '../MainMenu';
import { Header } from '../Header';
import {
  ROUTE_CREATE_REVIEW,
  ROUTE_HOME,
} from '../../constants/routes';
import { NotFound } from '../NotFound';
import './styles.css';
import { Reviews } from '../../containers/Reviews';
import { CreateReview } from '../../containers/CreateReview';

export class Main extends Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { mobileOpen } = this.state;

    return (
      <div>
        <CssBaseline />
        <nav>
          <Hidden smUp implementation="css">
            <MainMenu
              PaperProps={{ style: { width: 256 } }}
              variant="temporary"
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
            />
          </Hidden>
          <Hidden smDown implementation="css">
            <MainMenu
              PaperProps={{ style: { width: 256 } }}
              variant="permanent"
            />
          </Hidden>
        </nav>
        <div>
          <Header onDrawerToggle={this.handleDrawerToggle} />
          <main className="main">
            <Switch>
              <Route
                exact
                path={ROUTE_HOME}
                component={Reviews}
              />
              <Route
                exact
                path={`${ROUTE_CREATE_REVIEW}/:reviewId?`}
                component={CreateReview}
              />
              <Route
                component={NotFound}
              />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}
