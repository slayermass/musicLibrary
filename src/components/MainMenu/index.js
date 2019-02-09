// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import './styles.css';
import type { Location, RouterHistory } from 'react-router';
import { GlobalMenu } from './GlobalMenu';

type Props = {
  history: RouterHistory,
  location: Location,
  variant: string,
  onClose: () => void,
  open: boolean,
}

export class MainMenuComponent extends Component<Props> {
  render() {
    const {
      location: { pathname }, variant, open, onClose } = this.props;
    
    return (
      <Drawer
        className="main-menu"
        variant={variant}
        open={open}
        onClose={onClose}
      >
        <GlobalMenu pathname={pathname} />
      </Drawer>
    );
  }
}

export const MainMenu = withRouter(MainMenuComponent);
