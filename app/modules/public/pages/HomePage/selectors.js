import { createSelector } from 'reselect';

const selectTournamentsState = state => state.get('tournaments');

const makeSelectFeaturedCompetitions = () =>
  createSelector(selectTournamentsState, competitionsState => {
    const tournaments = competitionsState.get('items').toJS(); // TODO: probably should be without toJS()

    if (tournaments === undefined) {
      return tournaments;
    }

    return tournaments.slice(0, 3);
  });

export { makeSelectFeaturedCompetitions };
