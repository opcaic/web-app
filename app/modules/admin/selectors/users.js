import { createSelector } from 'reselect';

const getUsers = state => state.get('users');

export const selectUsers = createSelector(getUsers, state =>
  state.get('items').toJS(),
);
export const isFetching = createSelector(getUsers, state =>
  state.get('isFetching'),
);
