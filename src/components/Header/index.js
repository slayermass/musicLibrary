import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import { SignOutButton } from '../SignOut';
import { getTitleByRoute } from '../../constants/routes';
import { withFirebase } from '../Firebase';
import './Header.css';
import { withMainTitle } from '../../containers/HOC/MainTitle';

export class HeaderComponent extends Component {
  render() {
    const {
      onDrawerToggle,
      location: { pathname },
      firebase,
      mainTitle
    } = this.props;

    const { auth: { currentUser } } = firebase;

    return (
      <React.Fragment>
        <AppBar position="sticky" elevation={0} className="main-header">
          <Toolbar>
            <Grid container spacing={8} alignItems="center">
              <Hidden mdUp implementation="css">
                <Grid item>
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={onDrawerToggle}
                    className="menuButton"
                  >
                    <MenuIcon />
                  </IconButton>
                </Grid>
              </Hidden>
              <Typography variant="h4" color="inherit" className="grow">
                { mainTitle || getTitleByRoute(pathname) }
              </Typography>
              <Grid item>
                <IconButton color="inherit" className="iconButtonAvatar">
                  <AccountCircleIcon className="avatar" />
                  <div className="username-field">
                    {currentUser ? currentUser.email : ''}
                  </div>
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <SignOutButton />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

export const Header = withRouter(withFirebase(withMainTitle(HeaderComponent)));
