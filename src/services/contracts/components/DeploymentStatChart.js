import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Brush from 'recharts/lib/cartesian/Brush';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = theme => ({
  subtitle: {
    color: '#0000008a',
    fontSize: 14
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2,
  },
  anomaly: {
    color: '#f00'
  }
});

function formatXAxis(tick) {
  return moment(tick).format('MMM D YY');
}

function formatYAxis(tick) {
  return (tick / 1000) + 'K';
}

class CustomizedDot extends React.Component {
  render() {
    const { cx, cy, payload } = this.props;

    return (
      <circle cx={cx} cy={cy} r={1} stroke={payload.l} fill={payload.l} />
    );
  }
};

class DeploymentStatChart extends Component {
  render() {
    const { classes, data } = this.props;

    if (!data || data.length === 0) {
      return (
        <div>No data</div>
      )
    }

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          Contract deployments
        </Typography>
        <Typography variant="subtitle2"
          className={classes.subtitle + ' ' + classes.mb2}>
          The chart shows amount of deployed contracts weekly. It displays <span className={classes.anomaly}>anomalies</span> using Iglewicz and Hoaglin's method.
        </Typography>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
        <ResponsiveContainer width='99%' height={320}>
          <LineChart data={data} margin={{ bottom: 20 }} >
            <XAxis
              dataKey='d'
              tickFormatter={formatXAxis}
              height={20}
              style={{ fontSize: 10 }} />
            <YAxis
              tickFormatter={formatYAxis}
              orientation='left'
              stroke="#9E9E9E"
              width={40}
              style={{ fontSize: 10 }} />
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <Tooltip />
            <Line
              type='monotone'
              dataKey='c'
              stroke="#ccc"
              isAnimationActive={false}
              dot={<CustomizedDot />} />
            <Brush />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
}

DeploymentStatChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(DeploymentStatChart);
