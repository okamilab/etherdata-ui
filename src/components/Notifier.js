import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  info: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
    backgroundColor: amber[500],
    width: '100%',
    maxWidth: '100%',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

class Notifier extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    const { classes } = this.props;

    if (!this.state.open) {
      return null;
    }

    return (
      <SnackbarContent
        className={classes.info}
        aria-describedby='client-snackbar'
        message={
          <span id='client-snackbar' className={classes.message}>
            <WarningIcon className={classes.icon} />
            Presented data covers last 30 days
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='Close'
            color='inherit'
            className={classes.close}
            onClick={() => { this.setState({ open: false }) }}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}>
      </SnackbarContent>
    )
  }
}

Notifier.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifier);