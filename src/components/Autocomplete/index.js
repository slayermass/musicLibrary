// @flow

import React, { Component } from 'react';
import Select from 'react-select/dist/react-select';
import NoSsr from '@material-ui/core/NoSsr';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import './styles.css';

export type AutocompleteEvent = {
  value: any
}

type Suggestion = {
  value: number,
  label: string
}

type Props = {
  placeholder?: string,
  multiple?: boolean,
  valueField?: string,
  labelField?: string,
  label?: string,
  required?: boolean,
  error?: boolean,
  options: Array<any>,
  value: any,
  onChange: (AutocompleteEvent) => any,
  optionMessage?: any,
}

export class Autocomplete extends Component<Props> {
  static defaultProps = {
    placeholder: '',
    multiple: false,
    valueField: 'id',
    labelField: 'name',
    optionMessage: null,
    label: '',
    required: false,
    error: false,
  };

  NoOptionsMessage = (props: any) => {
    return (
      <Typography
        color="textSecondary"
        className="no-options-message"
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  };

  inputComponent = ({ inputRef, ...props }: {inputRef: any, props: any}) => {
    return <div ref={inputRef} {...props} />;
  };

  Control = (props: any) => {
    const { required, error } = this.props;

    return (
      <TextField
        fullWidth
        required={required}
        error={error}
        InputProps={{
          inputComponent: this.inputComponent,
          inputProps: {
            className: 'input',
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
          style: props.selectProps.textFieldProps.label ? {} : { marginTop: '16px' }
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  };

  Option = (props: any) => {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  };

  Placeholder = (props: any) => {
    return (
      <Typography
        color="textSecondary"
        className="placeholder"
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  };

  SingleValue = (props: any) => {
    return (
      <Typography className="single-value" {...props.innerProps}>
        {props.children}
      </Typography>
    );
  };

  ValueContainer = (props: any) => {
    return <div className="value-container">{props.children}</div>;
  };

  MultiValue = (props: any) => {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        className={`chip ${props.isFocused ? 'chip-focused' : ''}`}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
  };

  Menu = (props: any) => {
    return (
      <Paper square {...props.innerProps} className="paper">
        {props.children}
      </Paper>
    );
  };

  onChangeHandle = (item: Suggestion) => {
    const { options, onChange } = this.props;

    onChange({
      value: item ? options.find(option => option.id === item.value) : null
    });
  };

  getOptions = () => {
    const {
      options, valueField, labelField, optionMessage
    }: any = this.props;

    return options ? options.map(item => ({
      value: item[valueField],
      label: optionMessage ? optionMessage(item) : item[labelField]
    })) : [];
  };

  getValue = () => {
    const {
      value, valueField, labelField, options
    } = this.props;

    if (value) {
      const option = options.find(item => item.id === value);

      return option ? {
        value: option[valueField],
        label: option[labelField],
      } : null;
    }

    return null;
  };

  render() {
    const { placeholder, multiple, label } = this.props;

    return (
      <div className="autocomplete">
        <NoSsr>
          <Select
            components={{
              Control: this.Control,
              Menu: this.Menu,
              MultiValue: this.MultiValue,
              NoOptionsMessage: this.NoOptionsMessage,
              Option: this.Option,
              Placeholder: this.Placeholder,
              SingleValue: this.SingleValue,
              ValueContainer: this.ValueContainer,
            }}
            options={this.getOptions()}
            value={this.getValue()}
            onChange={this.onChangeHandle}
            placeholder={placeholder}
            isClearable
            isMulti={multiple}
            textFieldProps={{
              label,
              InputLabelProps: {
                shrink: true,
              },
            }}
          />
        </NoSsr>
      </div>
    );
  }
}
