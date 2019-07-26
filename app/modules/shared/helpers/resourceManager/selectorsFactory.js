import { createSelector } from 'reselect';

const selectorsFactory = ({ storePath }) => {
  const getState = state => state.getIn(storePath.split('.'));

  return {
    getItems: createSelector(getState, state => state.get('items').toJS()),
    getItem: createSelector(
      getState,
      state => state.get('item') && state.get('item').toJS(),
    ),
    isFetching: createSelector(getState, state => state.get('isFetching')),
  };
};

export default selectorsFactory;
