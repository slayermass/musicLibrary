// @flow
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { menuItems } from '../../../constants/routes';
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
        <div className="menu-list" style={{ width: 300 }}>
          <MenuTreeNode
            pathname={pathname}
            node={{ id: 0, name: 'root', children: arrayToTree(menuItems) }}
          />
        </div>
      </List>
    );
  }
}
