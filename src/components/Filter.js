import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { mutateFilter } from './../services/filter/actions';

const styles = theme => ({
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
  filter: {
    paddingRight: 15
  },
});

function Filter({ dispatch, classes, filter }) {
  return (
    // <Paper className={classes.paper}>
    //   <span className={classes.filter}>Filter</span>
      <Select
        value={filter}
        onChange={(e) => {
          dispatch(mutateFilter(e.target.value));
        }}
        name="filter"
      >
        <MenuItem value={30}>Last 30 days</MenuItem>
        <MenuItem value={365}>Last year</MenuItem>
        <MenuItem value={0}>All time</MenuItem>
      </Select>
    // </Paper>
  );
}

Filter.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.number.isRequired
};

export default compose(
  connect(state => {
    const { filter } = state || 30;
    return { filter };
  }),
  withStyles(styles)
)(Filter);