import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withSnackbar } from 'notistack';
import { convertFromImmutableToJS } from '../../../helpers/common';
import { storeName } from './reducer';
import { clearAlerts as clearAlertsAction } from './actions';

const mapStateToProps = (state) => {
  return {
    alerts: convertFromImmutableToJS(state.getIn([storeName, 'alerts'])),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearAlerts: () => {
      dispatch(clearAlertsAction());
    },
  };
};

export const WithAlertsHOC = (WrappedComponent) => {
  return class extends React.Component {
    componentDidUpdate() {
      const {
        enqueueSnackbar, alerts, clearAlerts
      } = this.props;
  
      if (alerts.length) {
        alerts.forEach((alert) => {
          enqueueSnackbar(alert.message, { variant: alert.variant });
        });

        clearAlerts();
      }
    }
  
    render() {
      const {
        enqueueSnackbar, alerts, clearAlerts, ...rest
      } = this.props;
      
      return <WrappedComponent {...rest} />;
    }
  };
};

export const WithAlerts = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSnackbar,
  WithAlertsHOC
);
