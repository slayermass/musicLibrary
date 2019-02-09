import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class ConfirmDialog extends Component {
  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleAgree = () => {
    const { onSuccess } = this.props;
    onSuccess();
  };

  render() {
    const { title, description, confirmBtnTitle } = this.props;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={this.handleAgree} color="primary" autoFocus>
            {confirmBtnTitle || 'OK'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
