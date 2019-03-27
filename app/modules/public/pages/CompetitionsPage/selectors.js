import { createSelector } from 'reselect';

const selectCompetitionsState = state => state.get('competitions');

const makeSelectCompetitions = () =>
  createSelector(selectCompetitionsState, competitionsState =>
    competitionsState.get('competitions'),
  );

export { makeSelectCompetitions };
