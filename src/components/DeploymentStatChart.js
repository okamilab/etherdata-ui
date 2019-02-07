import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Brush from 'recharts/lib/cartesian/Brush';
import moment from 'moment';

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
    const { data } = this.props;

    if (!data || data.length === 0) {
      return (
        <div>No data</div>
      )
    }

    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

DeploymentStatChart.propTypes = {
  data: PropTypes.array
};

export default DeploymentStatChart;
