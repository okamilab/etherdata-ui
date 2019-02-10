import {
  MINERS_STAT_REQUEST,
  MINERS_STAT_RECEIVE
} from './actions';

export const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: []
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case MINERS_STAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case MINERS_STAT_RECEIVE: {
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