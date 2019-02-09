export const FILTER_MUTATE = 'FILTER_MUTATE';

export function mutateFilter(value) {
  return (dispatch) => {
    dispatch({ type: FILTER_MUTATE, value });
  };
}
