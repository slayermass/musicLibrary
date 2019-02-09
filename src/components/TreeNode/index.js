import React, { Component } from 'react';
import './styles.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';

export class TreeNode extends Component {
  state = {
    visible: true
  };

  toggle = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  onSelectHandle = category => () => {
    const { onSelect } = this.props;
    onSelect(category);
  };

  renderChildren = (children, visible) => {
    const { onSelect, selectedNode } = this.props;

    return children.map(item => (
      <Collapse
        in={visible}
        timeout="auto"
        unmountOnExit
        key={item.id}
        className="sub-tree"
      >
        <TreeNode node={item} onSelect={onSelect} selectedNode={selectedNode} />
      </Collapse>
    ));
  };

  renderExpandIcon = (visible) => {
    return visible ? <ExpandLess /> : <ExpandMore />;
  };

  render() {
    const { node, selectedNode } = this.props;
    const { visible } = this.state;

    return (
      <List className="tree-node">
        <ListItem button onClick={this.onSelectHandle(node)}>
          <ListItemIcon>
            <Radio disabled checked={selectedNode ? selectedNode.id === node.id : false} />
          </ListItemIcon>
          <ListItemText inset primary={node.name} />

          {node.children && node.children.length ? (
            <div onClick={this.toggle} className="tree-expand">
              {this.renderExpandIcon(visible)}
            </div>
          ) : null}
        </ListItem>

        {node.children && node.children.length ? this.renderChildren(node.children, visible) : null}

      </List>
    );
  }
}
