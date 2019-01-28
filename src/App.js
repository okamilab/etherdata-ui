import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import BlockStatChart from './components/BlockStatChart';
import TokenUsageView from './components/TokenUsageView';
import MinerStatView from './components/MinerStatView';

dotenv.config();

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
  },
  footer: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blocks30: [],
      blocks: [],
      tokens30: [],
      tokens365: [],
      tokens: [],
      miners30: [],
      miners365: [],
      miners: [],
      filter: 30
    };

    this.filter = this.filter.bind(this);
  }

  init() {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/blocks/stat30`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.setState({ blocks30: data });

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/blocks/stat`, { mode: 'cors' })
          .then(response => response.json())
          .then(data => this.setState({ blocks: data }));
      });

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/tokens/usage30`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.setState({ tokens30: data });

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/tokens/usage365`, { mode: 'cors' })
          .then(response => response.json())
          .then(data => this.setState({ tokens365: data }));

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/tokens/usage`, { mode: 'cors' })
          .then(response => response.json())
          .then(data => this.setState({ tokens: data }));
      });

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/miners/stat30`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        this.setState({ miners30: data });

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/miners/stat365`, { mode: 'cors' })
          .then(response => response.json())
          .then(data => this.setState({ miners365: data }));

        fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/miners/stat`, { mode: 'cors' })
          .then(response => response.json())
          .then(data => this.setState({ miners: data }));
      });
  }

  componentDidMount() {
    this.init();
  }

  filter(event) {
    this.setState({
      filter: event.target.value
    });
  }

  getBlocks() {
    const { filter, blocks, blocks30 } = this.state;
    switch (filter) {
      case 0:
      case 365:
        let data = blocks;
        if (filter) {
          const now = new Date();
          const filterTime = (new Date()).setDate(now.getDate() - filter);
          data = blocks.filter(x => new Date(x.d) >= filterTime)
        }
        return data;
      default:
        return blocks30;
    }
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

  getMiners() {
    const { filter, miners, miners30, miners365 } = this.state;
    switch (filter) {
      case 0:
        return miners;
      case 365:
        return miners365;
      default:
        return miners30;
    }
  }

  render() {
    const { classes } = this.props;

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
            <BlockStatChart data={this.getBlocks()} />
          </Paper>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" color="inherit" noWrap>
                  Most used tokens
                </Typography>
                <TokenUsageView data={this.getTokens()} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" color="inherit" noWrap>
                  Top miners
                </Typography>
                <MinerStatView data={this.getMiners()} />
              </Paper>
            </Grid>
          </Grid>
        </main>
        <div className={classes.footer}>
          <div>
            Etherdata is a Analytics Platform for Ethereum
          </div>
          <div>
            <span>©</span> {(new Date()).getFullYear()} Etherdata | <Link href={process.env.REACT_APP_GITHUB}>GitHub</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
