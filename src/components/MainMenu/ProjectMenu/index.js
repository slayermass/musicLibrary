// @flow
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Button, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {
  ROUTE_HOME, ROUTE_PROJECTS
} from '../../../constants/routes';
import './styles.css';
import { arrayToTree } from '../../../helpers/common';
import { MenuTreeNode } from '../MenuTreeNode';

export type Props = {
  menuItems: Array<string>,
  pathname: string,
  projectName: string,
  canGoToProjects: boolean,
}

const block = 'project-menu';

export class ProjectMenuComponent extends PureComponent<Props> {
  render() {
    const {
      menuItems, pathname, projectName, canGoToProjects
    } = this.props;
    
    return (
      <List disablePadding className={block}>
        <ListItem className="firebase item itemCategory">
          <Link to={ROUTE_HOME} className="itemLink item-logo">
            <img src="/img/logo.png" alt="logo" />
          </Link>
        </ListItem>
        {
          canGoToProjects && (
            <div className={`${block}_to-projects`}>
              <Link to={ROUTE_PROJECTS}>
                <Button variant="outlined" color="primary" fullWidth>
                  <ArrowBackIcon /> К проектам
                </Button>
              </Link>
            </div>
          )
        }
        <div className="menu-list">
          <Typography variant="h6" align="center" gutterBottom>
            {projectName}
          </Typography>
          <MenuTreeNode
            pathname={pathname}
            node={{ id: 0, name: 'root', children: arrayToTree(menuItems) }}
          />
        </div>
      </List>
    );
  }
}
