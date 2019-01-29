import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import BarChart from 'recharts/lib/chart/BarChart';
import Bar from 'recharts/lib/cartesian/Bar';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import Tooltip from 'recharts/lib/component/Tooltip';

const styles = theme => ({
  tooltip: {
    background: '#fff',
    border: '1px solid #e0e0e0',
    padding: 10
  }
});

function formatYAxis(tick) {
  return (tick / 1000) + 'K';
}

class ContractObsolescenceTooltip extends Component {
  render() {
    const { classes, active, label } = this.props;

    if (active && label) {
      const { payload } = this.props;
      return (
        <div className={classes.tooltip}>
          {`${label} week(s): ${payload[0].value}`}
        </div>
      );
    }

    return null;
  }
}

ContractObsolescenceTooltip.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string,
  payload: PropTypes.array,
  label: PropTypes.number,
};

class ContractObsolescenceChart extends Component {
  render() {
    const { classes, data } = this.props;

    if (!data || data.length === 0) {
      return (
        <div>No data</div>
      )
    }

    return (
      <React.Fragment>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
        <ResponsiveContainer width='99%' height={420}>
          <BarChart data={data} margin={{ bottom: 20 }}>
            <XAxis dataKey="w"
              height={20}
              style={{ fontSize: 10 }} />
            <YAxis tickFormatter={formatYAxis}
              width={40}
              style={{ fontSize: 10 }} />
            <Bar dataKey="c" fill="#4285F4" />
            <Tooltip content={<ContractObsolescenceTooltip classes={classes} />} />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    )
  }
}

ContractObsolescenceChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(ContractObsolescenceChart);