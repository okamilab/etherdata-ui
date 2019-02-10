import * as api from './api';

export const BLOCKS_STAT_REQUEST = 'BLOCKS_STAT_REQUEST';
export const BLOCKS_STAT_RECEIVE = 'BLOCKS_STAT_RECEIVE';

export function fetchBlocksStat() {
  return async (dispatch, _, client) => {
    dispatch({ type: BLOCKS_STAT_REQUEST });
    const items = await api.fetchBlocksStat(client);
    dispatch({
      type: BLOCKS_STAT_RECEIVE,
      items
    });
  };
}