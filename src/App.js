import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dotenv from 'dotenv';
import withStyles from '@material-ui/core/styles/withStyles';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet-async';

import Layout from './components/Layout';
import Home from './pages/Home';

dotenv.config();

const styles = theme => ({
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
  subtitle: {
    color: '#0000008a',
    fontSize: 14
  },
  mb2: {
    marginBottom: theme.spacing.unit * 2,
  },
  anomaly: {
    color: '#f00'
  },
  block: {
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'center'
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
      contractObs: [],
      deployments: [],
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

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/contracts/obsolescence`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => { this.setState({ contractObs: data }) });

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v0.1/contracts/deployment`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => { this.setState({ deployments: data }) });
  }

  componentDidMount() {
    // this.init();
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
    // const { classes } = this.props;

    // let contractObs = [];
    // if (this.state.contractObs.length) {
    //   contractObs = this.state.contractObs
    //     .map((x, i) => { return { w: i + 1, c: x } })
    // }

    // const outliers = stats.indexOfOutliers(this.state.deployments.map(d => d.c), stats.outlierMethod.MAD, 2);
    // const deployments = this.state.deployments.map((d, i) => {
    //   const l = outliers.includes(i) ? '#f00' : '#222';
    //   return { ...d, l };
    // });
    // const deploymentsWithoutOutliners = this.state.deployments
    //   .filter((_, i) => !outliers.includes(i))
    //   .map(d => d.c);

    return (
      <React.Fragment>
        <Helmet titleTemplate='Etherdata - %s' />
        <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
