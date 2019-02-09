import * as api from './api';

export const BLOCKS_STAT_REQUEST = 'BLOCKS_STAT_REQUEST';
export const BLOCKS_STAT_RECEIVE = 'BLOCKS_STAT_RECEIVE';

export function fetchBlocksStat() {
  return async (dispatch, _, client) => {
    dispatch(requestBlocks());
    const blocks = await api.fetchBlocksStat(client);
    dispatch(receiveBlocks(blocks));
  };
}

function requestBlocks() {
  return {
    type: BLOCKS_STAT_REQUEST,
  };
}

function receiveBlocks(blocks) {
  return {
    type: BLOCKS_STAT_RECEIVE,
    blocks
  };
}