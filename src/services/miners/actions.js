import * as api from './api';

export const MINERS_STAT_REQUEST = 'MINERS_STAT_REQUEST';
export const MINERS_STAT_RECEIVE = 'MINERS_STAT_RECEIVE';
export const MINERS_STAT_FILTER_MUTATE = 'MINERS_STAT_FILTER_MUTATE';

export function fetchMinersStat() {
  return async (dispatch, getState, client) => {
    const { miners } = getState();
    const { filter } = miners.stat;

    if (!miners.stat[filter].isFetching
      && !miners.stat[filter].didInvalidate) {
      return;
    }

    dispatch({ type: MINERS_STAT_REQUEST, filter });
    const items = await api.fetchMinersStat(client, filter);
    dispatch({ type: MINERS_STAT_RECEIVE, filter, items });
  };
}

export function mutateMinersStatFilter(value) {
  return async (dispatch) => {
    dispatch({ type: MINERS_STAT_FILTER_MUTATE, value });
    dispatch(fetchMinersStat());
  };
}