import {
  BLOCKS_STAT_REQUEST,
  BLOCKS_STAT_RECEIVE,
  BLOCKS_STAT_FILTER_MUTATE
} from './actions';

export const blockStatFilter = {
  default: 0,
  month: 30
}

export const initialState = {
  stat: {
    [blockStatFilter.default]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    [blockStatFilter.month]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    filter: blockStatFilter.month
  }
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case BLOCKS_STAT_REQUEST:
      return Object.assign({}, state, {
        stat: {
          ...state.stat,
          [action.filter]: {
            isFetching: true,
            didInvalidate: false
          }
        }
      });
    case BLOCKS_STAT_RECEIVE: {
      return Object.assign({}, state, {
        stat: {
          ...state.stat,
          [action.filter]: {
            isFetching: false,
            didInvalidate: false,
            items: action.items,
          }
        }
      });
    }
    case BLOCKS_STAT_FILTER_MUTATE: {
      return Object.assign({}, state, {
        stat: {
          ...state.stat,
          filter: action.value
        }
      });
    }
    default:
      return state;
  }
}