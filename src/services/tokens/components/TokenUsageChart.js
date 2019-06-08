import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Chart } from "react-google-charts";

import Filter from './../../../components/Filter';
import { fetchTokensUsage, mutateTokensUsageFilter } from './../actions';

const styles = theme => ({
});

class TokenUsageChart extends Component {
  render() {
    const { dispatch, isFetching, items, filter } = this.props;

    const options = [
      { key: 30, value: "Last 30 days" },
      { key: 365, value: "Last year" },
      { key: 0, value: "All time" },
    ];

    if (isFetching) {
      return (
        <div>Loading...</div>
      )
    }

    if (!items || items.length === 0) {
      return (
        <div>No data</div>
      )
    }

    const data = [["Key", "Value"]];
    items.slice(0, 20)
      .forEach(i => {
        data.push([i.n || i.a, i.tf_c]);
      });

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          TOP-20 most used tokens (transfers)
        </Typography>
        <Chart
          width={'100%'}
          height={'500px'}
          chartType="PieChart"
          data={data}
          options={{
            pieHole: 0.4,
            sliceVisibilityThreshold: 0
          }}
        />
        <Filter
          options={options}
          filter={filter}
          onChange={(value) => {
            dispatch(mutateTokensUsageFilter(value));
          }} />
      </>
    );
  }
}

TokenUsageChart.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { filter } = state.tokens.usage || { filter: 30 };
    const { isFetching = true, items = [] } = state.tokens.usage[filter] || {
      isFetching: false,
      items: []
    };
    return { filter, items, isFetching };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchTokensUsage()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(TokenUsageChart);