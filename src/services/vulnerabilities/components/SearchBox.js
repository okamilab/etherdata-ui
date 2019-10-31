import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from '@material-ui/core/styles/withStyles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { List, BarChart } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';

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
  }
});

class SearchBox extends React.Component {
  render() {
    const { classes, history } = this.props;

    return (
      <>
        <Typography variant="h6" color="inherit" noWrap>
          Smart Contracts Vulnerabilities
          <IconButton aria-haspopup="true" color="inherit">
            <Link to='/vulnerabilities' style={{ textDecoration: 'none', color: 'black' }}>
              <List />
            </Link>
          </IconButton>
          <IconButton aria-haspopup="true" color="inherit">
            <Link to='/vulnerabilities/stats' style={{ textDecoration: 'none', color: 'black' }}>
              <BarChart />
            </Link>
          </IconButton>
        </Typography>
        <Toolbar className={classes.mt3}>
          <div className={classes.search}>
            <InputBase
              placeholder="Address"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  history.push(`/contracts/${ev.target.value}/vulnerabilities`);
                }
              }}
            />
          </div>
        </Toolbar>
      </>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SearchBox));