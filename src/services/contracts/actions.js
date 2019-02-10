import * as api from './api';

export const CONTRACTS_OBSOLESCENCE_REQUEST = 'CONTRACTS_OBSOLESCENCE_REQUEST';
export const CONTRACTS_OBSOLESCENCE_RECEIVE = 'CONTRACTS_OBSOLESCENCE_RECEIVE';
export const CONTRACTS_DEPLOYMENTS_REQUEST = 'CONTRACTS_DEPLOYMENTS_REQUEST';
export const CONTRACTS_DEPLOYMENTS_RECEIVE = 'CONTRACTS_DEPLOYMENTS_RECEIVE';

export function fetchContractsObsolescence() {
  return async (dispatch, _, client) => {
    dispatch({ type: CONTRACTS_OBSOLESCENCE_REQUEST });
    const contracts = await api.fetchContractsObsolescence(client);
    dispatch({
      type: CONTRACTS_OBSOLESCENCE_RECEIVE,
      contracts: contracts
    });
  };
}

export function fetchContractsDeployments() {
  return async (dispatch, _, client) => {
    dispatch({ type: CONTRACTS_DEPLOYMENTS_REQUEST });
    const contracts = await api.fetchContractsDeployments(client);
    dispatch({
      type: CONTRACTS_DEPLOYMENTS_RECEIVE,
      contracts: contracts
    });
  };
}