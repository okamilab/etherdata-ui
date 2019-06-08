import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  footer: {
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

function Footer({ classes }) {
  return (
    <div className={classes.footer}>
      <div>
        Etherdata is a Analytics Platform for Ethereum
      </div>
      <div>
        <span>©</span> {(new Date()).getFullYear()} Okami Lab | <Link href={process.env.REACT_APP_GITHUB}>GitHub</Link>
      </div>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
