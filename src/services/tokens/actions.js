import * as api from './api';

export const TOKENS_USAGE_REQUEST = 'TOKENS_USAGE_REQUEST';
export const TOKENS_USAGE_RECEIVE = 'TOKENS_USAGE_RECEIVE';
export const TOKENS_USAGE_FILTER_MUTATE = 'TOKENS_USAGE_FILTER_MUTATE';

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