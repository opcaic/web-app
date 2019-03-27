import { createSelector } from 'reselect';

const selectCompetitionsState = state => state.get('competitions');

const makeSelectFeaturedCompetitions = () =>
  createSelector(selectCompetitionsState, competitionsState => {
    const competitions = competitionsState.get('competitions');

    if (competitions === undefined) {
      return competitions;
    }

    return competitions.slice(0, 3);
  });

export { makeSelectFeaturedCompetitions };
