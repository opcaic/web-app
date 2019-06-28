import { createSelector } from 'reselect';

const selectTournamentsState = state => state.get('tournaments');

const makeSelectTournaments = () =>
  createSelector(
    selectTournamentsState,
    tournamentsState => tournamentsState.get('items').toJS(), // TODO: probably should be without toJS()
  );

const makeSelectTournamentsIsFetching = () =>
  createSelector(selectTournamentsState, tournamentsState =>
    tournamentsState.get('isFetching'),
  );

export { makeSelectTournaments, makeSelectTournamentsIsFetching };
