import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Divider from '@material-ui/core/Divider';

import BlockStatChart from './BlockStatChart';
import Filter from './../../../components/Filter';
import { fetchBlocksStat, mutateBlocksStatFilter } from './../actions';

const styles = theme => ({
  divider: {
    marginBottom: theme.spacing.unit
  }
});

class BlockStatView extends Component {
  render() {
    const { dispatch, classes, filter, items, isFetching } = this.props;

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

    const options = [
      { key: 30, value: "Last 30 days" },
      { key: 0, value: "All time" },
    ];

    return (
      <React.Fragment>
        <BlockStatChart items={items} />
        <Divider className={classes.divider} />
        <Filter
          options={options}
          filter={filter}
          onChange={(value) => {
            dispatch(mutateBlocksStatFilter(value));
          }} />
      </React.Fragment>
    );
  }
}

BlockStatView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { filter } = state.blocks.stat || { filter: 30 };
    const { isFetching = true, items = [] } = state.blocks.stat[filter] || {
      isFetching: false,
      items: []
    };
    return { filter, items, isFetching };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchBlocksStat()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(BlockStatView);
