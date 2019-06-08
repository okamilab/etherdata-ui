import React from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet-async';

import Layout from './components/Layout';
import Home from './pages/Home';
import Contracts from './services/contracts/pages/Contracts';
import Tokens from './services/tokens/pages/Tokens';
import Erc721 from './services/tokens/pages/Erc721';
import Miners from './services/miners/pages/Miners';

export default function App() {
  return (
    <>
      <Helmet titleTemplate='Etherdata - %s' />
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/contracts' component={Contracts} />
          <Route exact path='/tokens' component={Tokens} />
          <Route exact path='/tokens/erc721' component={Erc721} />
          <Route exact path='/miners' component={Miners} />
        </Switch>
      </Layout>
    </>
  );
}
