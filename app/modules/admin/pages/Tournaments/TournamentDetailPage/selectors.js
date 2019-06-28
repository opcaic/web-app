import { createSelector } from 'reselect';

const selectTournamentState = state => state.get('tournaments');

const makeSelectTournament = () =>
  createSelector(selectTournamentState, tournamentState => {
    const tournament = tournamentState.get('item');

    if (tournament === null) {
      return null;
    }

    return tournament.toJS(); // TODO: probably should be without toJS()
  });

const makeSelectTournamentIsFetching = () =>
  createSelector(selectTournamentState, tournamentsState =>
    tournamentsState.get('isFetchingItem'),
  );

export { makeSelectTournament, makeSelectTournamentIsFetching };
