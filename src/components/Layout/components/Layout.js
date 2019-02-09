import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
