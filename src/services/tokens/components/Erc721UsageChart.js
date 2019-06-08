import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Chart } from "react-google-charts";

import { fetchErc721Usage } from './../actions';

const styles = theme => ({
});

class Erc721StatChart extends Component {
  render() {
    const { isFetching, items } = this.props;

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

    const columns = [{ type: "date", label: "Date" }];
    const addressSet = new Set(items.map(i => i.a));
    const addressMap = {};
    let index = 0;
    addressSet
      .forEach((x) => {
        addressMap[x] = index;
        columns.push({ type: 'number', label: x });
        index += 1;
      });

    const data = [];

    let entry = new Array(columns.length).fill(null);
    entry[0] = items[0].d;
    items.forEach(i => {
      if (i.d !== entry[0]) {
        // fixes type for date
        entry[0] = new Date(entry[0]);
        data.push(entry);
        entry = new Array(columns.length).fill(null);
        entry[0] = i.d;
      }

      entry[addressMap[i.a] + 1] = i.c;
    });

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          ERC-721 usage
        </Typography>
        <Chart
          height={'600px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          columns={columns}
          rows={data}
          options={{
            isStacked: true,
            // hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
            interpolateNulls: true
          }}
          rootProps={{ 'data-testid': '1' }} />
      </>
    );
  }
}

Erc721StatChart.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { isFetching = true, items = [] } = state.tokens.erc721.usage || {
      isFetching: false,
      items: []
    };
    return { items, isFetching };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchErc721Usage()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(Erc721StatChart);