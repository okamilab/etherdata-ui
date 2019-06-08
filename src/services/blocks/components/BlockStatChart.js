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
import Brush from 'recharts/lib/cartesian/Brush';
import moment from 'moment';

const styles = theme => ({
  panel: {
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'row'
  },
  tab: {
    cursor: 'pointer',
    padding: theme.spacing.unit,
    opacity: 0.7,
    [theme.breakpoints.up(500 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 2
    },
    [theme.breakpoints.up(700 + theme.spacing.unit * 3 * 2)]: {
      padding: theme.spacing.unit * 3
    },
  }
});

function formatXAxis(tick) {
  return moment(tick).format('MMM D YY');
}

function formatYAxisDefault(tick) {
  return tick;
}

class BlockStatChart extends Component {
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
          title: 'Blocks',
          dataKey: 'c',
          selected: true,
          color: '#DB4437',
          format: formatYAxisDefault
        },
        {
          id: 1,
          title: 'Difficulty',
          dataKey: 'a_d',
          selected: false,
          color: '#F6BF26',
          format: (t) => t + 'G'
        },
        {
          id: 2,
          title: 'Transactions',
          dataKey: 'tx_c',
          selected: false,
          color: '#0F9D58',
          format: (t) => (t / 1000) + 'K'
        },
        {
          id: 3,
          title: 'Gas',
          dataKey: 'g_u',
          selected: false,
          color: '#1A73E8',
          format: (t) => (t / 1000000000) + 'B'
        },
        {
          id: 4,
          title: 'Size',
          dataKey: 's',
          selected: false,
          color: '#9E9E9E',
          format: (t) => (t / Math.pow(1024, 2)).toFixed(1) + 'M'
        }
      ]
    });
  }

  selectTab(id) {
    const { tabs } = this.state;

    this.setState({
      tabs: tabs.map(t => t.id === id ? { ...t, selected: !t.selected } : t)
    });
  }

  render() {
    const { classes, items } = this.props;

    return (
      <>
        <div className={classes.panel}>
          {
            this.state.tabs.map((t) => {
              const selectedStyle = t.selected ? { background: t.color } : null;
              return (
                <div
                  key={t.id}
                  className={classes.tab}
                  style={selectedStyle}
                  onClick={() => { this.selectTab(t.id) }} >
                  {t.title}
                </div>
              );
            })
          }
        </div>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
        <ResponsiveContainer width='99%' height={320}>
          <LineChart data={items} margin={{ bottom: 20 }}>
            <XAxis
              dataKey='d'
              tickFormatter={formatXAxis}
              height={20}
              style={{ fontSize: 10 }} />
            {
              this.state.tabs.map((t) => {
                if (!t.selected) {
                  return null;
                }

                return (
                  <YAxis
                    key={t.id}
                    yAxisId={t.id}
                    orientation='left'
                    stroke={t.color}
                    tickFormatter={t.format}
                    width={40}
                    style={{ fontSize: 10 }} />
                );
              })
            }
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <Tooltip />
            {
              this.state.tabs.map((t) => {
                if (!t.selected) {
                  return null;
                }

                return (
                  <Line
                    key={t.id}
                    type='monotone'
                    dataKey={t.dataKey}
                    dot={{ r: 0 }}
                    stroke={t.color}
                    yAxisId={t.id} />
                );
              })
            }
            <Brush />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  }
}

BlockStatChart.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(BlockStatChart);
