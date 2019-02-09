import {
  BLOCKS_STAT_REQUEST,
  BLOCKS_STAT_RECEIVE
} from './actions';

export const initialState = {
  isFetching: false,
  didInvalidate: true,
  items: []
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case BLOCKS_STAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case BLOCKS_STAT_RECEIVE: {
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.blocks,
      });
    }
    default:
      return state;
  }
}