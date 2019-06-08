import * as api from './api';

export const TOKENS_USAGE_REQUEST = 'TOKENS_USAGE_REQUEST';
export const TOKENS_USAGE_RECEIVE = 'TOKENS_USAGE_RECEIVE';
export const TOKENS_USAGE_FILTER_MUTATE = 'TOKENS_USAGE_FILTER_MUTATE';
export const ERC721_STAT_REQUEST = 'ERC721_STAT_REQUEST';
export const ERC721_STAT_RECEIVE = 'ERC721_STAT_RECEIVE';
export const ERC721_USAGE_REQUEST = 'ERC721_USAGE_REQUEST';
export const ERC721_USAGE_RECEIVE = 'ERC721_USAGE_RECEIVE';

export function fetchTokensUsage() {
  return async (dispatch, getState, client) => {
    const { tokens } = getState();
    const { filter } = tokens.usage;

    if (!tokens.usage[filter].isFetching
      && !tokens.usage[filter].didInvalidate) {
      return;
    }

    dispatch({ type: TOKENS_USAGE_REQUEST, filter });
    const items = await api.fetchTokensUsage(client, filter);
    dispatch({ type: TOKENS_USAGE_RECEIVE, filter, items });
  };
}

export function mutateTokensUsageFilter(value) {
  return async (dispatch) => {
    dispatch({ type: TOKENS_USAGE_FILTER_MUTATE, value });
    dispatch(fetchTokensUsage());
  };
}

export function fetchErc721Stat() {
  return async (dispatch, _, client) => {
    dispatch({ type: ERC721_STAT_REQUEST });
    const items = await api.fetchErc721Stat(client);
    dispatch({ type: ERC721_STAT_RECEIVE, items });
  };
}

export function fetchErc721Usage() {
  return async (dispatch, _, client) => {
    dispatch({ type: ERC721_USAGE_REQUEST });
    const items = await api.fetchErc721Usage(client);
    dispatch({ type: ERC721_USAGE_RECEIVE, items });
  };
}