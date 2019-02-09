import * as api from './api';

export const CONTRACTS_OBSOLESCENCE_REQUEST = 'CONTRACTS_OBSOLESCENCE_REQUEST';
export const CONTRACTS_OBSOLESCENCE_RECEIVE = 'CONTRACTS_OBSOLESCENCE_RECEIVE';

export function fetchContractsObsolescence() {
  return async (dispatch, _, client) => {
    dispatch(requestContracts());
    const contracts = await api.fetchContractsObsolescence(client);
    dispatch(receiveContracts(contracts));
  };
}

function requestContracts() {
  return {
    type: CONTRACTS_OBSOLESCENCE_REQUEST,
  };
}

function receiveContracts(contracts) {
  return {
    type: CONTRACTS_OBSOLESCENCE_RECEIVE,
    contracts: contracts
  };
}