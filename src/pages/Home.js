import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import Filter from './../components/Filter';
import BlockStatChart from './../components/BlockStatChart';
import { fetchBlocksStat } from './../services/blocks/actions';

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
});

function Home({ classes, blocks }) {
  // const getBlocks = function () {
  //   const { filter, blocks, blocks30 } = this.state;
  //   switch (filter) {
  //     case 0:
  //     case 365:
  //       let data = blocks;
  //       if (filter) {
  //         const now = new Date();
  //         const filterTime = (new Date()).setDate(now.getDate() - filter);
  //         data = blocks.filter(x => new Date(x.d) >= filterTime)
  //       }
  //       return data;
  //     default:
  //       return blocks30;
  //   }
  // }

  return (
    <React.Fragment>
      <Filter />
      <Paper className={classes.paper}>
        <BlockStatChart data={blocks} />
      </Paper>
    </React.Fragment>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(state => {
    const { isFetching, items: blocks } = state.blocksStat || {
      isFetching: true,
      items: []
    };
    return { isFetching, blocks };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchBlocksStat()),
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(Home);