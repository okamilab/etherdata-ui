import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Filter from './../../../components/Filter';
import { fetchTokensUsage, mutateTokensUsageFilter } from './../actions';

const styles = theme => ({
  row: {
    height: 36
  },
  cell: {
    padding: 0
  },
  divider: {
    marginBottom: theme.spacing.unit
  }
});

class TokenUsageView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 10
    };

    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  render() {
    const { dispatch, isFetching, items, classes, filter } = this.props;
    const { page, rowsPerPage } = this.state;

    const options = [
      { key: 30, value: "Last 30 days" },
      { key: 365, value: "Last year" },
      { key: 0, value: "All time" },
    ];

    if (isFetching) {
      return (
        <div>Loading...</div>
      )
    }

    if (!items || items.length === 0) {
      return (
        <div>No data</div>
      )
    }

    return (
      <React.Fragment>
        <Typography variant="h6" color="inherit" noWrap>
          Most used tokens
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Token</TableCell>
              <TableCell className={classes.cell}>Transfers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((t, i) => (
                  <TableRow key={i} className={classes.row}>
                    <TableCell component="th" scope="row" className={classes.cell}>
                      <Link href={'https://etherscan.io/address/' + t.a}
                        color="inherit"
                        target="_blank"
                        rel="noopener">
                        {t.n || t.a}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.cell}>{t.tf_c}</TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[rowsPerPage]}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
        />
        <Divider className={classes.divider} />
        <Filter
          options={options}
          filter={filter}
          onChange={(value) => {
            dispatch(mutateTokensUsageFilter(value));
          }} />
      </React.Fragment>
    );
  }
}

TokenUsageView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  filter: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { filter } = state.tokens.usage || { filter: 30 };
    const { isFetching = true, items = [] } = state.tokens.usage[filter] || {
      isFetching: false,
      items: []
    };
    return { filter, items, isFetching };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchTokensUsage()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(TokenUsageView);