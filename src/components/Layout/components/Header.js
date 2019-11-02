import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouteLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  menuButton: {
    marginRight: theme.spacing.unit,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  }
});

function Header({ classes }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <>
      <CssBaseline />
      <AppBar color="default" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <RouteLink to='/contracts' className={classes.link}>Contracts</RouteLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RouteLink to='/tokens' className={classes.link}>Tokens</RouteLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RouteLink to='/miners' className={classes.link}>Miners</RouteLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <RouteLink to='/publicKeys' className={classes.link}>Public Keys</RouteLink>
            </MenuItem>
          </Menu>
          <RouteLink to='/' className={classes.link}>
            <Typography variant="h6" color="inherit" noWrap>
              Etherdata
            </Typography>
          </RouteLink>
        </Toolbar>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
