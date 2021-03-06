import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';
import Typography from '@material-ui/core/Typography';

import { fetchContractsObsolescence } from '../actions';

const styles = theme => ({
  tooltip: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    padding: 10
  },
  subtitle: {
    color: '#0000008a',
    fontSize: 14
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2,
  },
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

function formatYAxis(tick) {
  return (tick / 1000) + 'K';
}

function ObsolescenceTooltip({ classes, active, label, payload }) {
  if (active && label) {
    return (
      <div className={classes.tooltip}>
        {`${label} week(s): ${payload[0].value}`}
      </div>
    );
  }

  return null;
}

ObsolescenceTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.number,
};

class ObsolescenceChart extends Component {
  render() {
    const { classes, items } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    let list = items.map((x, i) => { return { w: i + 1, c: x } })

    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" color="inherit" noWrap>
          Contract obsolescence
        </Typography>
        <Typography variant="subtitle2"
          className={classes.subtitle + ' ' + classes.mb2}>
          The chart shows how long smart contracts are used. Contracts with at least one transaction are in count.
        </Typography>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
        <ResponsiveContainer width='99%' height={420}>
          <BarChart data={list} margin={{ bottom: 20 }}>
            <XAxis dataKey="w"
              height={20}
              style={{ fontSize: 10 }} />
            <YAxis tickFormatter={formatYAxis}
              width={40}
              style={{ fontSize: 10 }} />
            <Bar dataKey="c" fill="#4285F4" />
            <Tooltip content={<ObsolescenceTooltip classes={classes} />} />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    )
  }
}

ObsolescenceChart.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { isFetching, items } = state.contracts.obsolescence || {
      isFetching: true,
      items: []
    };
    return { isFetching, items };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchContractsObsolescence()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(ObsolescenceChart);