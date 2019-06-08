import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TokenUsageChart from './../components/TokenUsageChart';

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
  paperTop: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4
    },
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    padding: '40px 0'
  }
});

function Tokens({ classes }) {
  return (
    <>
      <Grid container className={classes.paperTop}>
        <Grid item xs={6} sm={4}>
          <RouteLink to={'/tokens/erc721'} className={classes.link}>
            <Paper className={classes.paper}>
              <Typography variant="h6" color="inherit" noWrap>
                ERC721
              </Typography>
            </Paper>
          </RouteLink>
        </Grid>
      </Grid>
      <Paper className={classes.paper}>
        <TokenUsageChart />
      </Paper>
    </>
  );
}

Tokens.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Tokens);