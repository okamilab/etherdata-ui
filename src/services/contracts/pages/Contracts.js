import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import ContractObsolescenceChart from './../components/ContractObsolescenceChart'
import { fetchContractsObsolescence } from './../actions';

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
  subtitle: {
    color: '#0000008a',
    fontSize: 14
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2,
  },
});

function Contracts({ classes, contracts }) {
  let contractObs = [];
  if (contracts.length) {
    contractObs = contracts
      .map((x, i) => { return { w: i + 1, c: x } })
  }

  return (
    <div>
      <Paper className={classes.paper}>
        <Typography variant="h6" color="inherit" noWrap>
          Contract obsolescence
        </Typography>
        <Typography variant="subtitle2"
          className={classes.subtitle + ' ' + classes.mb2}>
          The chart shows how long smart contracts are used. Contracts with at least one transaction are in count.
        </Typography>
        <ContractObsolescenceChart data={contractObs} />
      </Paper>
    </div>
  );
}

Contracts.propTypes = {
  contracts: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(state => {
    const { isObsFetching, obsItems: contracts } = state.contracts || {
      isObsFetching: true,
      obsItems: []
    };
    return { isObsFetching, contracts };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchContractsObsolescence()),
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(Contracts);