import { createSelector } from 'reselect';

const selectorsFactory = ({ storePath }) => {
  const getState = state => state.getIn(storePath.split('.'));

  return {
    getItems: createSelector(getState, state => state.get('items').toJS()),
    getTotalItems: createSelector(getState, state => state.get('totalItems')),
    getItem: createSelector(
      getState,
      state => state.get('item') && state.get('item').toJS(),
    ),
    getFetchItemError: createSelector(
      getState,
      state =>
        state.get('fetchItemError') && state.get('fetchItemError').toJS(),
    ),
    isFetching: createSelector(getState, state => state.get('isFetching')),
    isFetchingItem: createSelector(getState, state =>
      state.get('isFetchingItem'),
    ),
    isCreating: createSelector(getState, state => state.get('isCreating')),
    isDeleting: createSelector(getState, state => state.get('isDeleting')),
  };
};

export default selectorsFactory;
