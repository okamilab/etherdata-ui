import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import ScatterChart from 'recharts/lib/chart/ScatterChart';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Scatter from 'recharts/lib/cartesian/Scatter';
import Dot from 'recharts/lib/shape/Dot';
// import { d3 } from 'd3';
import { scaleLinear, scaleTime } from 'd3-scale';
import { extent } from 'd3-array';
import { min, max } from 'd3-array';
import moment from 'moment';

const styles = theme => ({
});

function formatXAxis(tick) {
  return moment(tick).format('MMM D YY');
}

function formatYAxis(tick) {
  return Number.parseFloat(tick).toExponential();
}

class BlockNonceStatChart extends Component {
  render() {
    const { data } = this.props;

    if (!data.length) {
      return <div>aaa</div>;
    }
    return (
      <React.Fragment>
        <Scatterplot
          width={1000}
          height={800}
          marginTop="40"
          x={d => d.d}
          y={d => d.n}
          r={d => 1}
          fill={d => "red"}
          xTickArguments={[5]}
          yTickArguments={[5]}
          data={data} />
      </React.Fragment>
    );
  }
}

BlockNonceStatChart.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array
};

export default withStyles(styles)(BlockNonceStatChart);


const top = 1;
const right = 2;
const bottom = 3;
const left = 4;
const epsilon = 1e-6;

function translateX(scale0, scale1, d) {
  const x = scale0(d);
  return `translate(${(isFinite(x) ? x : scale1(d))},0)`;
}

function translateY(scale0, scale1, d) {
  const y = scale0(d);
  return `translate(0,${(isFinite(y) ? y : scale1(d))})`;
}

let identity = x => x;

const orientations = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4
};

class Axis extends React.Component {
  render() {
    const orient = orientations[this.props.orientation] || 4;
    const scale = this.props.scale;

    var tickArguments = this.props.tickArguments,
      tickValues = null,
      tickFormat = null,
      tickSizeInner = 6,
      tickSizeOuter = 6,
      tickPadding = 3;

    var values = tickValues == null ? (scale.ticks ?
      scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues;

    var format = tickFormat == null ? (scale.tickFormat ?
      scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat;

    var spacing = Math.max(tickSizeInner, 0) + tickPadding,
      transform = orient === top || orient === bottom ? translateX : translateY,
      range = scale.range(),
      range0 = range[0] + 0.5,
      range1 = range[range.length - 1] + 0.5,
      position = (scale.bandwidth ? 0 : identity)(scale.copy()),
      k = orient === top || orient === left ? -1 : 1,
      x,
      y = orient === left || orient === right ? (x = 'x', 'y') : (x = 'y', 'x');

    let lineProps = {
      [x + 2]: k * tickSizeInner,
      [y + 1]: 0.5,
      [y + 2]: 0.5
    };

    let textProps = {
      [x]: k * spacing,
      [y]: 0.5
    };

    var pathString = orient === left || orient == right
      ? 'M' + k * tickSizeOuter + ',' + range0 + 'H0.5V' + range1 + 'H' + k * tickSizeOuter
      : 'M' + range0 + ',' + k * tickSizeOuter + 'V0.5H' + range1 + 'V' + k * tickSizeOuter;

    var gTicks = values.map((d, i) => {
      return (
        <g
          className="tick"
          transform={transform(position, position, d)}
          key={i}>
          <line stroke='#000'	{...lineProps} />
          <text
            fill='#000'
            textAnchor={orient === right ? 'start' : orient === left ? 'end' : 'middle'}
            {...textProps}
            dy={orient === top ? '0em' : orient === bottom ? '0.71em' : '0.32em'}>
            {format(d)}
          </text>
        </g>
      )
    });

    return (
      <g className="Axis" fill="none" fontSize="10" fontFamily="sans-serif" textAnchor="end">
        <path d={pathString} stroke="#000" />
        {gTicks}
      </g>
    );
  }
}

Axis.propTypes = {
  orientation: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  tickArguments: PropTypes.array
};

Axis.defaultProps = {
  tickArguments: []
};

class Points extends React.Component {
  render() {
    var circles = this.props.data.map((d, i) => {
      return (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          fill={d.fill}
          stroke={d.stroke} >
        </circle>
      )
    });
    return (
      <g className="Points">
        {circles}
      </g>
    );
  }
}

class Scatterplot extends React.Component {
  render() {
    var innerWidth = this.props.width - this.props.marginLeft - this.props.marginRight;
    var innerHeight = this.props.height - this.props.marginTop - this.props.marginBottom;
    var innerTransform = `translate(${this.props.marginLeft},${this.props.marginTop})`;

    // var xDomain = this.props.data.map(r => this.props.x(r));
    var yDomain = this.props.data.map(r => this.props.y(r)).flat();

    var xScale = scaleTime()
      .domain([0, this.props.data.length])
      .range([0, innerWidth]);

    var yScale = scaleLinear()
      .domain([min(yDomain), max(yDomain)])
      .range([innerHeight, 0]);

    // var xValue = d => {
    //   console.log(this.props.x(d), xScale(this.props.x(d)));
    //   return xScale(this.props.x(d))
    // };
    // var yValue = d => yScale(this.props.y(d));
    // var rValue = d => this.props.r(d);
    // var fillValue = d => this.props.fill(d);
    // var strokeValue = d => this.props.stroke(d);

    var pointsData = this.props.data.map((d, i) => {
      return d.n.map(r => {
        return {
          x: xScale(i + 1),
          y: yScale(r),
          r: 0.1,
          fill: 'red',
          stroke: 'none'
        };
      });
    }).flat();

    var bottomAxisTransform = `translate(0,${innerHeight})`;

    return (
      <svg
        className="Scatterplot"
        width={this.props.width}
        height={this.props.height}>

        <g transform={innerTransform}>

          <Points data={pointsData} />

          <g transform={bottomAxisTransform}>
            <Axis
              orientation="bottom"
              scale={xScale}
              tickArguments={this.props.xTickArguments} />
          </g>

          <Axis
            orientation="left"
            scale={yScale}
            tickArguments={this.props.yTickArguments} />
        </g>

      </svg>
    );
  }
}

Scatterplot.propType = {
  marginTop: PropTypes.number,
  marginLeft: PropTypes.number,
  marginBottom: PropTypes.number,
  marginRight: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  x: PropTypes.func,
  y: PropTypes.func,
  r: PropTypes.func,
  fill: PropTypes.func,
  stroke: PropTypes.func,
  xDomain: PropTypes.number,
  yDomain: PropTypes.number,
  xTickArguments: PropTypes.array,
  yTickArguments: PropTypes.array,
  data: PropTypes.array.isRequired
};

Scatterplot.defaultProps = {
  marginTop: 10,
  marginLeft: 30,
  marginBottom: 30,
  marginRight: 30,
  width: 960,
  height: 500,
  x: d => d.x,
  y: d => d.y,
  r: d => 3,
  fill: d => "#000",
  stroke: d => "none",
  xTickArguments: [],
  yTickArguments: []
};