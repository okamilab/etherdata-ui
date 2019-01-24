import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

import BlockStatChart from './components/BlockStatChart';
import TokenStatView from './components/TokenStatView';

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
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
  paperTop: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
  filter: {
    paddingRight: 15
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks: [],
      tokens30: [],
      tokens365: [],
      tokens: [],
      filter: 30
    };

    this.filter = this.filter.bind(this);
  }

  init() {
    fetch('http://localhost:7071/api/blocks/stat')
      .then(response => response.json())
      .then(data => this.setState({ blocks: data }));

    fetch('http://localhost:7071/api/tokens/stat30')
      .then(response => response.json())
      .then(data => this.setState({ tokens30: data }));

    fetch('http://localhost:7071/api/tokens/stat365')
      .then(response => response.json())
      .then(data => this.setState({ tokens365: data }));

    fetch('http://localhost:7071/api/tokens/stat')
      .then(response => response.json())
      .then(data => this.setState({ tokens: data }));
  }

  componentDidMount() {
    this.init();
  }

  filter(event) {
    this.setState({
      filter: event.target.value
    });
  }

  getTokens() {
    const { filter, tokens, tokens30, tokens365 } = this.state;
    switch (filter) {
      case 0:
        return tokens;
      case 365:
        return tokens365;
      default:
        return tokens30;
    }
  }

  render() {
    const { classes } = this.props;

    let blocks = this.state.blocks;
    if (this.state.filter) {
      const now = new Date();
      const filterTime = (new Date()).setDate(now.getDate() - this.state.filter);
      blocks = blocks.filter(x => new Date(x.date) >= filterTime)
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
          <Paper className={classes.paper + ' ' + classes.paperTop}>
            <span className={classes.filter}>Filter</span>
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
          <Paper className={classes.paper}>
            <BlockStatChart data={blocks} />
          </Paper>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" color="inherit" noWrap>
                  Most used tokens
                </Typography>
                <TokenStatView data={this.getTokens()} />
              </Paper>
            </Grid>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
