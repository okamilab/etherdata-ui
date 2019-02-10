import * as api from './api';

export const TOKENS_USAGE_REQUEST = 'TOKENS_USAGE_REQUEST';
export const TOKENS_USAGE_RECEIVE = 'TOKENS_USAGE_RECEIVE';

export function fetchTokensUsage() {
  return async (dispatch, _, client) => {
    dispatch({ type: TOKENS_USAGE_REQUEST });
    const items = await api.fetchTokensUsage(client);
    dispatch({
      type: TOKENS_USAGE_RECEIVE,
      items
    });
  };
}