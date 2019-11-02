import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import { fetchPublicKey } from './../actions';

const styles = theme => ({
  mt3: {
    marginTop: theme.spacing.unit * 2,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: darken(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: darken(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
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
});

function Lookup({ classes, isFetching, dispatch, data }) {
  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" color="inherit" noWrap>
        Public Key Lookup
      </Typography>
      <Toolbar className={classes.mt3}>
        <div className={classes.search}>
          <InputBase
            placeholder="Address or ENS name"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            disabled={isFetching}
            onKeyPress={async (ev) => {
              if (ev.key === 'Enter') {
                await dispatch(fetchPublicKey(ev.target.value));
              }
            }}
          />
        </div>
      </Toolbar>
      {(data.address || data.ens) && <>
        <hr />
        <Typography component='div'>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Typography>
      </>}
    </Paper>
  );
}

Lookup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  data: PropTypes.object
};

export default compose(
  connect(state => {
    const { isFetching = true, data = {} } = state.publicKey || {
      isFetching: false,
      data: {}
    };
    return { data, isFetching };
  }),
  withStyles(styles)
)(Lookup);