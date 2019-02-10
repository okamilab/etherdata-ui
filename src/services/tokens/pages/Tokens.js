import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import Notifier from './../../../components/Notifier';
import HomeNav from './../../../components/HomeNav';
import TokenUsageView from './../components/TokenUsageView';

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

function Tokens({ classes }) {
  return (
    <React.Fragment>
      <HomeNav />
      <Notifier />
      {/* <Filter /> */}
      <Paper className={classes.paper + ' ' + classes.paperTop}>
        <TokenUsageView />
      </Paper>
    </React.Fragment>
  );
}

Tokens.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tokens);