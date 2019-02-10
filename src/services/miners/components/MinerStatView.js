import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withJob } from 'react-jobs';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Link from '@material-ui/core/Link';

import { fetchMinersStat } from './../actions';

const styles = theme => ({
  row: {
    height: 36
  },
  cell: {
    padding: 0
  }
});

class MinerStatView extends Component {
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
    const { items, classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <React.Fragment>
        <Typography variant="h6" color="inherit" noWrap>
          Top miners
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Miner</TableCell>
              <TableCell className={classes.cell}>Blocks</TableCell>
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
                        {t.a}
                      </Link>
                    </TableCell>
                    <TableCell className={classes.cell}>{t.b}</TableCell>
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
      </React.Fragment>
    );
  }
}

MinerStatView.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default compose(
  connect(state => {
    const { isFetching, items } = state.miners || {
      isFetching: true,
      items: []
    };
    return { isFetching, items };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchMinersStat()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(MinerStatView);