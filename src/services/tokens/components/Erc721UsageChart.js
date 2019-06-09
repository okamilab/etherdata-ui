import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Chart } from 'react-google-charts';

import { fetchErc721Usage } from './../actions';

const styles = theme => ({
});

class Erc721StatChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(_, newValue) {
    this.setState({ selectedTab: newValue });
  }

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
    const dataAgg = [];

    let sum = 0;
    let entry = new Array(columns.length).fill(null);
    entry[0] = items[0].d;
    items.forEach(i => {
      if (i.d !== entry[0]) {
        // fixes type for date
        entry[0] = new Date(entry[0]);
        data.push(entry);
        dataAgg.push([new Date(entry[0]), sum]);

        entry = new Array(columns.length).fill(null);
        entry[0] = i.d;
        sum = 0;
      }

      entry[addressMap[i.a] + 1] = i.c;
      sum += i.c;
    });

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          ERC-721 usage
        </Typography>
        <Tabs
          value={this.state.selectedTab}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab label="Aggregated" />
          <Tab label="By token" />
        </Tabs>
        {this.state.selectedTab === 0 && <Chart
          height={'600px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          columns={[{ type: "date", label: "Date" }, { type: "number", label: "All" }]}
          rows={dataAgg}
          options={{
            trendlines: {
              0: {
                type: 'polynomial',
                degree: 5,
                color: 'green',
                visibleInLegend: true,
                labelInLegend: 'Trend',
                lineWidth: 1,
                opacity: 0.5,
              },
            },
          }}
          rootProps={{ 'data-testid': '1' }} />}
        {this.state.selectedTab === 1 && <Chart
          height={'600px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          columns={columns}
          rows={data}
          options={{
            isStacked: true,
            interpolateNulls: true,
          }}
          rootProps={{ 'data-testid': '1' }} />}
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