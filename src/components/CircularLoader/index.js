import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';

export const CircularLoader = (props) => {
  return (
    <div className="circularOverlay">
      <CircularProgress size={60} className="CircularLoader" {...props} />
    </div>
  );
};
