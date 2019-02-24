import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function Filter({ options, filter, onChange }) {
  return (
    <Select
      value={filter}
      onChange={(e) => onChange(+e.target.value)}
      name="filter"
    >
      {/* <MenuItem value={30}>Last 30 days</MenuItem>
      <MenuItem value={365}>Last year</MenuItem>
      <MenuItem value={0}>All time</MenuItem> */}
      {options.map(x => <MenuItem value={x.key} key={x.key}>{x.value}</MenuItem>)}
    </Select>
  );
}

Filter.propTypes = {
  options: PropTypes.array.isRequired,
  filter: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Filter;