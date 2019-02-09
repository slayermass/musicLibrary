import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export const EmptyMessageComponent = ({ text }) => (
  <Grid container>
    <Grid item md={12}>
      <Typography variant="h6" color="textSecondary" align="center">
        {text}
      </Typography>
    </Grid>
  </Grid>
);
