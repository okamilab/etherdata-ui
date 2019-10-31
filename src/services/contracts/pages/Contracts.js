import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import SearchBox from './../../vulnerabilities/components/SearchBox';
import ObsolescenceChart from './../components/ObsolescenceChart';
import DeploymentsView from './../components/DeploymentsView';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
});

function Contracts({ classes }) {
  return (
    <>
      <Paper className={classes.paper}>
        <SearchBox />
      </Paper>
      <ObsolescenceChart />
      <DeploymentsView />
    </>
  );
}

Contracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contracts);