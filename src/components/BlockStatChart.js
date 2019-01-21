import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import { unstable_Box as Box } from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import moment from 'moment';

const styles = theme => ({
  tab: {
    padding: 25,
  }
});

function formatXAxis(tick) {
  return moment(tick).format('MMM d YY')
}

function formatYAxisDefault(tick) {
  return tick;
}

class BlocksPerDayChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabs: []
    };

    this.selectTab = this.selectTab.bind(this);
  }

  componentDidMount() {
    this.setState({
      tabs: [
        {
          id: 0,
          title: "Blocks",
          dataKey: "count",
          selected: true,
          color: "#DB4437",
          format: formatYAxisDefault
        },
        {
          id: 1,
          title: "Difficulty",
          dataKey: "avg_difficulty",
          selected: false,
          color: "#F6BF26",
          format: (t) => t + 'G'
        },
        {
          id: 2,
          title: "Transactions",
          dataKey: "tx_count",
          selected: false,
          color: "#0F9D58",
          format: (t) => (t / 1000) + 'K'
        },
        {
          id: 3,
          title: "Size",
          dataKey: "size",
          selected: false,
          color: "#9E9E9E",
          format: (t) => {
            return (t / Math.pow(1024, 2)).toFixed(1) + 'M';
          }
        }
      ]
    });
  }

  selectTab(id) {
    const { tabs } = this.state;

    this.setState({
      tabs: tabs.map(t => {
        if (t.id !== id) {
          return t;
        }

        return { ...t, selected: !t.selected };
      })
    });
  }

  render() {
    const { classes, data } = this.props;

    if (!data || data.length === 0) {
      return (
        <div>No data</div>
      )
    }

    return (
      <React.Fragment>
        <div>
          <Box display="flex" flexDirection="row" p={1} m={1}>
            {
              this.state.tabs.map((t) => {
                const selectedStyle = t.selected ? { background: t.color } : null;
                return (
                  <Tab
                    key={t.id}
                    label={t.title}
                    className={classes.tab}
                    style={selectedStyle}
                    onClick={() => { this.selectTab(t.id) }} />
                );
              })
            }
          </Box>
        </div>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
        <ResponsiveContainer width="99%" height={320}>
          <LineChart data={data} margin={{ bottom: 30 }}>
            <XAxis dataKey="date" tick={{ angle: -45 }} dy={20} tickFormatter={formatXAxis} />
            {
              this.state.tabs.map((t) => {
                if (!t.selected) {
                  return null;
                }

                return (
                  <YAxis
                    key={t.id}
                    yAxisId={t.id}
                    orientation="left"
                    stroke={t.color}
                    tickFormatter={t.format} />
                );
              })
            }
            {/* <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" /> */}
            {/* <YAxis yAxisId="right" orientation="right" stroke="#2a5a9d" tickFormatter={formatYAxis} /> */}
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            {
              this.state.tabs.map((t) => {
                if (!t.selected) {
                  return null;
                }

                return (
                  <Line
                    key={t.id}
                    type="monotone"
                    dataKey={t.dataKey}
                    dot={{ r: 0 }}
                    stroke={t.color}
                    yAxisId={t.id} />
                );
              })
            }
          </LineChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  }
}

BlocksPerDayChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(BlocksPerDayChart);