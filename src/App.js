import React from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet-async';

import Layout from './components/Layout';
import Home from './pages/Home';
import Contracts from './services/contracts/pages/Contracts'
import Tokens from './pages/Tokens'

export default function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate='Etherdata - %s' />
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/contracts' component={Contracts} />
          <Route exact path='/tokens' component={Tokens} />
        </Switch>
      </Layout>
    </React.Fragment>
  );
}
