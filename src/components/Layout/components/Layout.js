import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Header from './Header';
import Footer from './Footer';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    position: 'relative'
  },
  layout: {
    height: '100%',
    width: 'auto',
    paddingTop: 64,
    paddingBottom: 100,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

function Layout({ classes, children }) {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.layout}>{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node
};

export default withStyles(styles)(Layout);