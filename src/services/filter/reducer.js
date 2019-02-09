import {
  FILTER_MUTATE
} from './actions';

export const initialState = 30;

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case FILTER_MUTATE:
      return action.value;
    default:
      return state;
  }
}