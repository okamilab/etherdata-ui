import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link as RouteLink } from 'react-router-dom';

import Filter from './../components/Filter';
import BlockStatChart from '../services/blocks/components/BlockStatChart';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    padding: '40px 0'
  }
});

function Home({ classes }) {
  return (
    <React.Fragment>
      {/* <Filter /> */}
      <Paper className={classes.paper}>
        <BlockStatChart />
      </Paper>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <RouteLink to={'/contracts'} className={classes.link}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="inherit" noWrap>
                Contracts
              </Typography>
            </Paper>
          </RouteLink>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RouteLink to={'/tokens'} className={classes.link}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="inherit" noWrap>
                Tokens
              </Typography>
            </Paper>
          </RouteLink>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);