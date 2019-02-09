import React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Firebase } from '../Firebase';
import { store } from '../../index';
import { stopListenUsersAction } from '../../containers/Users/actions';

const onLougOut = () => {
  Firebase().doSignOut();
  store.dispatch(stopListenUsersAction());
};

export const SignOutButton = () => (
  <Tooltip title="Logout">
    <IconButton color="inherit" onClick={onLougOut}>
      <ExitToAppIcon />
    </IconButton>
  </Tooltip>
);
