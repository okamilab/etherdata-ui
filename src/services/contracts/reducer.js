import {
  CONTRACTS_OBSOLESCENCE_REQUEST,
  CONTRACTS_OBSOLESCENCE_RECEIVE
} from './actions';

export const initialState = {
  obsolescence: {
    isFetching: false,
    didInvalidate: true,
    items: []
  }
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case CONTRACTS_OBSOLESCENCE_REQUEST:
      return Object.assign({}, state, {
        obsolescence: {
          isFetching: true,
          didInvalidate: false
        }
      });
    case CONTRACTS_OBSOLESCENCE_RECEIVE: {
      return Object.assign({}, state, {
        obsolescence: {
          isFetching: false,
          didInvalidate: false,
          items: action.contracts
        }
      });
    }
    default:
      return state;
  }
}