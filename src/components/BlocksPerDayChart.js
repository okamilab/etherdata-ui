import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import moment from 'moment';

function formatXAxis(tickItem) {
  return moment(tickItem).format('MMM d YY')
}

function BlocksPerDayChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div>No data</div>
    )
  }

  const list = data.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={list} margin={{ bottom: 30 }}>
        <XAxis dataKey="date" tick={{ angle: -45 }} dy={20} tickFormatter={formatXAxis} />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Line type="monotone" dataKey="count" dot={{ r: 1 }} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

BlocksPerDayChart.propTypes = {
  data: PropTypes.array
};

export default BlocksPerDayChart;