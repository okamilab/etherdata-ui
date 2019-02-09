import {
  CONTRACTS_OBSOLESCENCE_REQUEST,
  CONTRACTS_OBSOLESCENCE_RECEIVE
} from './actions';

export const initialState = {
  isObsFetching: false,
  didObsInvalidate: true,
  obsItems: []
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case CONTRACTS_OBSOLESCENCE_REQUEST:
      return Object.assign({}, state, {
        isObsFetching: true,
        didObsInvalidate: false
      });
    case CONTRACTS_OBSOLESCENCE_RECEIVE: {
      return Object.assign({}, state, {
        isObsFetching: false,
        didObsInvalidate: false,
        obsItems: action.contracts,
      });
    }
    default:
      return state;
  }
}