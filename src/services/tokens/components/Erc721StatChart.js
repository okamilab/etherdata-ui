import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Chart } from "react-google-charts";

import { fetchErc721Stat } from './../actions';

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

    const data = [];
    items.forEach(i => {
      data.push([new Date(i.d), i.c]);
    });

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          ERC-721 deployments
        </Typography>
        <Chart
          height={'400px'}
          chartType='LineChart'
          loader={<div>Loading Chart</div>}
          columns={[{
            type: "date",
            label: "Date"
          },
          {
            type: "number",
            label: "Count"
          }]}
          rows={data}
          options={{
            vAxis: { minValue: 0 },
            legend: { position: 'none' }
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
    const { isFetching = true, items = [] } = state.tokens.erc721.stat || {
      isFetching: false,
      items: []
    };
    return { items, isFetching };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchErc721Stat()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(Erc721StatChart);