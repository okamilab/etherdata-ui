import {
  PUBLIC_KEY_REQUEST,
  PUBLIC_KEY_RECEIVE
} from './actions';

export const initialState = {
  isFetching: false,
  didInvalidate: true,
  data: {}
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case PUBLIC_KEY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case PUBLIC_KEY_RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        data: action.data
      });
    default:
      return state;
  }
}