import * as api from './api';

export const BLOCKS_STAT_REQUEST = 'BLOCKS_STAT_REQUEST';
export const BLOCKS_STAT_RECEIVE = 'BLOCKS_STAT_RECEIVE';
export const BLOCKS_STAT_FILTER_MUTATE = 'BLOCKS_STAT_FILTER_MUTATE';

export function fetchBlocksStat() {
  return async (dispatch, getState, client) => {
    const { blocks } = getState();
    const { filter } = blocks.stat;

    if (!blocks.stat[filter].isFetching
      && !blocks.stat[filter].didInvalidate) {
      return;
    }

    dispatch({ type: BLOCKS_STAT_REQUEST, filter });
    const items = await api.fetchBlocksStat(client, filter);
    dispatch({ type: BLOCKS_STAT_RECEIVE, filter, items });
  };
}

export function mutateBlocksStatFilter(value) {
  return async (dispatch) => {
    dispatch({ type: BLOCKS_STAT_FILTER_MUTATE, value });
    dispatch(fetchBlocksStat());
  };
}