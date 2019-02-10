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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { fetchTokensUsage } from './../actions';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
  paperTop: {
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 4,
      marginBottom: theme.spacing.unit * 4,
      padding: theme.spacing.unit * 3,
    },
  },
  row: {
    height: 36
  },
  cell: {
    padding: 0
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
    const { items, classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <Paper className={classes.paper + ' ' + classes.paperTop}>
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
      </Paper>
    );
  }
}

TokenUsageView.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  connect(state => {
    const { isFetching, items } = state.tokensUsage || {
      isFetching: true,
      items: []
    };
    return { isFetching, items };
  }),
  withJob({
    work: ({ dispatch }) => dispatch(fetchTokensUsage()),
    LoadingComponent: () => <div>Loading...</div>,
    error: function Error() { return <p>Error</p>; },
  }),
  withStyles(styles)
)(TokenUsageView);