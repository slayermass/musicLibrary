import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';

export class MenuTreeNode extends PureComponent {
  state = {
    visible: false
  };

  toggle = () => {
    const { visible } = this.state;

    this.setState({ visible: !visible });
  };

  renderChildren = (children, visible) => {
    const { pathname } = this.props;
    
    return children.map(item => (
      <Collapse
        in={visible}
        timeout="auto"
        unmountOnExit
        key={item.id}
        className="sub-tree"
      >
        <MenuTreeNode node={item} pathname={pathname} />
      </Collapse>
    ));
  };

  renderExpandIcon = (visible) => {
    return visible ? <ExpandLess /> : <ExpandMore />;
  };

  render() {
    const { node, pathname } = this.props;
    const { visible } = this.state;

    return (
      <List className="tree-node">
        {node.id !== 0 && (
          <ListItem
            button
            className={classNames(
              'item',
              'itemActionable',
              node.enable ? '' : 'disabled',
            )}
          >
            <Link to={node.url} className={`itemLink${node.url === pathname ? ' active' : ''}`}>
              <ListItemText
                classes={{
                  primary: 'itemPrimary',
                }}
              >
                {node.title}
              </ListItemText>
            </Link>
            {node.children && node.children.length ? (
              <div className="btn-toggle" onClick={this.toggle}>{this.renderExpandIcon(visible)}</div>
            ) : null}
          </ListItem>
        )}

        {
          node.children && node.children.length
            ? this.renderChildren(node.children, node.id === 0 ? true : visible)
            : null
        }
      </List>
    );
  }
}
