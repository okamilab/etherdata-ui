import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import ContractObsolescenceChart from './../components/ContractObsolescenceChart'

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
    <React.Fragment>
      <Paper className={classes.paper}>
        <ContractObsolescenceChart />
      </Paper>
    </React.Fragment>
  );
}

Contracts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contracts);