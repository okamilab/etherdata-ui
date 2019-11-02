import * as api from './api';

export const PUBLIC_KEY_REQUEST = 'PUBLIC_KEY_REQUEST';
export const PUBLIC_KEY_RECEIVE = 'PUBLIC_KEY_RECEIVE';

export function fetchPublicKey(query) {
  return async (dispatch, _, client) => {
    dispatch({ type: PUBLIC_KEY_REQUEST });
    const data = await api.fetchPublicKey(client, query);
    dispatch({
      type: PUBLIC_KEY_RECEIVE,
      data
    });
  };
}