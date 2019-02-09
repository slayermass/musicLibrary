// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ROUTE_HOME, menuItems } from '../../../constants/routes';
import './styles.css';
import { arrayToTree } from '../../../helpers/common';
import { MenuTreeNode } from '../MenuTreeNode';

type Props = {
  pathname: string,
}

export class GlobalMenu extends Component<Props> {
  render() {
    const { pathname } = this.props;

    return (
      <List disablePadding>
        <ListItem className="firebase item itemCategory">
          <Link to={ROUTE_HOME} className="itemLink item-logo">
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </ListItem>
        <div className="menu-list">
          <MenuTreeNode
            pathname={pathname}
            node={{ id: 0, name: 'root', children: arrayToTree(menuItems) }}
          />
        </div>
      </List>
    );
  }
}
