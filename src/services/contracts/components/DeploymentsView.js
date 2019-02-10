import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import stats from 'stats-analysis';

import DeploymentStatChart from './DeploymentStatChart';
import GrowthRateView from './GrowthRateView';
import { fetchContractsDeployments } from '../actions';

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
  anomaly: {
    color: '#f00'
  },
  block: {
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'center'
  }
});

class DeploymentsView extends Component {
  render() {
    const { classes, items } = this.props;

    if (!items || items.length === 0) {
      return (
        <div>No data</div>
      )
    }

    const outliers = stats.indexOfOutliers(items.map(d => d.c), stats.outlierMethod.MAD, 2);
    const deployments = items.map((d, i) => {
      const l = outliers.includes(i) ? '#f00' : '#222';
      return { ...d, l };
    });
    const deploymentsWithoutOutliners = items
      .filter((_, i) => !outliers.includes(i))
      .map(d => d.c);

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>
            <DeploymentStatChart data={deployments} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" color="inherit" noWrap>
              Growth Rate
            </Typography>
            <div className={classes.block}>
              <h3 className={classes.anomaly}>
                <GrowthRateView data={items.map(d => d.c)} className={classes.anomaly} />
              </h3>
              <div className={classes.subtitle}>
                Average growth rate including anomalies
              </div>
            </div>
            <div className={classes.block}>
              <h3>
                <GrowthRateView data={deploymentsWithoutOutliners} />
              </h3>
              <div className={classes.subtitle}>
                Average growth rate
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

DeploymentsView.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { isFetching, items } = state.contracts.deployments || {
      isFetching: true,
      items: []
    };
    return { isFetching, items };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchContractsDeployments()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(DeploymentsView);