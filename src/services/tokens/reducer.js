import {
  TOKENS_USAGE_REQUEST,
  TOKENS_USAGE_RECEIVE,
  TOKENS_USAGE_FILTER_MUTATE
} from './actions';

export const tokenUsageFilter = {
  default: 0,
  month: 30,
  year: 365
}

export const initialState = {
  usage: {
    [tokenUsageFilter.default]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    [tokenUsageFilter.month]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    [tokenUsageFilter.year]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    filter: tokenUsageFilter.month
  }
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case TOKENS_USAGE_REQUEST:
      return Object.assign({}, state, {
        usage: {
          ...state.usage,
          [action.filter]: {
            isFetching: true,
            didInvalidate: false
          }
        }
      });
    case TOKENS_USAGE_RECEIVE: {
      return Object.assign({}, state, {
        usage: {
          ...state.usage,
          [action.filter]: {
            isFetching: false,
            didInvalidate: false,
            items: action.items,
          }
        }
      });
    }
    case TOKENS_USAGE_FILTER_MUTATE: {
      return Object.assign({}, state, {
        usage: {
          ...state.usage,
          filter: action.value
        }
      });
    }
    default:
      return state;
  }
}