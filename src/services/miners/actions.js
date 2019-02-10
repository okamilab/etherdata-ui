import * as api from './api';

export const MINERS_STAT_REQUEST = 'MINERS_STAT_REQUEST';
export const MINERS_STAT_RECEIVE = 'MINERS_STAT_RECEIVE';

export function fetchMinersStat() {
  return async (dispatch, _, client) => {
    dispatch({ type: MINERS_STAT_REQUEST });
    const items = await api.fetchMinersStat(client);
    dispatch({
      type: MINERS_STAT_RECEIVE,
      items
    });
  };
}