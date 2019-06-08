import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import Erc721StatChart from './../components/Erc721StatChart';
import Erc721UsageChart from './../components/Erc721UsageChart';

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
  paperTop: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
});

function Erc721({ classes }) {
  return (
    <>
      <Paper className={classes.paper + ' ' + classes.paperTop}>
        <Erc721StatChart />
      </Paper>
      <Paper className={classes.paper}>
        <Erc721UsageChart />
      </Paper>
    </>
  );
}

Erc721.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Erc721);