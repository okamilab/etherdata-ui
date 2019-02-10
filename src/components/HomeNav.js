import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { NavigateBefore } from '@material-ui/icons';
import { Link as RouteLink } from 'react-router-dom';

const styles = theme => ({
  nav: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
    padding: '40px 0'
  }
});

function HomeNav({ classes }) {
  return (
    <div className={classes.nav}>
      <RouteLink to='/' className={classes.link}>
        <Button variant="contained">
          <NavigateBefore />
          Go Home
        </Button>
      </RouteLink>
    </div>
  )
}

HomeNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomeNav);