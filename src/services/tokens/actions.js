import * as api from './api';

export const TOKENS_USAGE_REQUEST = 'TOKENS_USAGE_REQUEST';
export const TOKENS_USAGE_RECEIVE = 'TOKENS_USAGE_RECEIVE';

export function fetchTokensUsage() {
  return async (dispatch, _, client) => {
    dispatch(requestTokensUsage());
    const blocks = await api.fetchTokensUsage(client);
    dispatch(receiveTokensUsage(blocks));
  };
}

function requestTokensUsage() {
  return {
    type: TOKENS_USAGE_REQUEST,
  };
}

function receiveTokensUsage(items) {
  return {
    type: TOKENS_USAGE_RECEIVE,
    items
  };
}