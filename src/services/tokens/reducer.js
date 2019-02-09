import {
  TOKENS_USAGE_REQUEST,
  TOKENS_USAGE_RECEIVE
} from './actions';

export const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: []
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case TOKENS_USAGE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case TOKENS_USAGE_RECEIVE: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
      });
    }
    default:
      return state;
  }
}