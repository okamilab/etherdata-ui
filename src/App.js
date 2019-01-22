import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import BlockStatChart from './components/BlockStatChart';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  divider: {
    marginTop: 10,
    marginBottom: 10
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filter: 30
    };

    this.filter = this.filter.bind(this);
  }

  init() {
    fetch('http://localhost:7071/api/blocks/statPerDay')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  componentDidMount() {
    this.init();
  }

  filter(event) {
    this.setState({
      filter: event.target.value
    });
  }

  render() {
    const { classes } = this.props;

    let data = this.state.data;
    if (this.state.filter) {
      const now = new Date();
      const filterTime = (new Date()).setDate(now.getDate() - this.state.filter);
      data = data.filter(x => new Date(x.date) >= filterTime)
    }

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Etherdata
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <BlockStatChart data={data} />
            <Divider className={classes.divider} />
            <Select
              value={this.state.filter}
              onChange={this.filter}
              name="filter"
            >
              <MenuItem value={30}>Last 30 days</MenuItem>
              <MenuItem value={365}>Last year</MenuItem>
              <MenuItem value={0}>All time</MenuItem>
            </Select>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
