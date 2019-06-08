import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GrowthRateView extends Component {
  render() {
    const { data } = this.props;
    if (!data || !data.length) {
      return <div>N/A</div>;
    }

    const value = data
      .map((m, i) => i > 0 ? 100 * (m - data[i - 1]) / data[i - 1] : 0)
      .reduce((acc, x) => acc + x);

    return (
      <>
        {parseFloat(value / data.length).toFixed(2)}%
      </>
    );
  }
}

GrowthRateView.propTypes = {
  data: PropTypes.array
};

export default GrowthRateView;