import {
  MINERS_STAT_REQUEST,
  MINERS_STAT_RECEIVE,
  MINERS_STAT_FILTER_MUTATE
} from './actions';

export const minerStatFilter = {
  default: 0,
  month: 30,
  year: 365
}

export const initialState = {
  stat: {
    [minerStatFilter.default]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    [minerStatFilter.month]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    [minerStatFilter.year]: {
      isFetching: false,
      didInvalidate: true,
      items: []
    },
    filter: minerStatFilter.month
  }
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case MINERS_STAT_REQUEST:
      return Object.assign({}, state, {
        stat: {
          ...state.stat,
          [action.filter]: {
            isFetching: true,
            didInvalidate: false
          }
        }
      });
    case MINERS_STAT_RECEIVE: {
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
    case MINERS_STAT_FILTER_MUTATE: {
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