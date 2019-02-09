// @flow
import React, { Component } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type SelectFieldType = {
  name: string,
  value: string,
  title: string,
}

type NodeType = {
  id: string,
  name: string,
  children: Array<NodeType>,
}

type Props = {
  field: SelectFieldType,
  error?: boolean,
  onChangeField: any,
  tree: Array<NodeType>,
  maxDepth: number, // Максимальная глубина для вывода опций select
  required?: boolean,
}

export class TreeSelect extends Component<Props> {
  static defaultProps = {
    error: false,
    required: false,
  };

  getOptions = (tree: Array<NodeType>) => {
    const options = [
      <MenuItem value="" key="">---</MenuItem>
    ];

    tree.forEach((item: any) => {
      this.getItem(options, item, 1);
    });

    return options;
  };

  getItem = (options: Array<any>, node: NodeType, depth: number) => {
    const { maxDepth } = this.props;

    options.push(
      <MenuItem
        value={node.id}
        key={node.id}
        style={{
          paddingLeft: `${depth * 30}px`
        }}
      >
        {node.name}
      </MenuItem>
    );

    if (depth < maxDepth && node.children && node.children.length) {
      node.children.forEach((item) => {
        this.getItem(options, item, depth + 1);
      });
    }
  };

  render() {
    const {
      onChangeField,
      error,
      field,
      tree,
      required
    } = this.props;

    return (
      <FormControl required={required} error={error} className="form-control">
        <InputLabel htmlFor={field.name}>{field.title}</InputLabel>
        <Select
          value={field.value}
          onChange={onChangeField}
          inputProps={{
            name: field.name,
            id: field.name,
          }}
        >
          {this.getOptions(tree)}
        </Select>
      </FormControl>
    );
  }
}
