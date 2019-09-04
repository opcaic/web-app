import { createSelector } from 'reselect';

const getMatchesItems = state => state.getIn(['matches', 'items']);

export const getMatchesListItems = createSelector(getMatchesItems, items =>
  items.toJS().map(x => ({
    id: x.id,
    index: x.index,
    tournament: x.tournament,
    botResults: x.executions[x.executions.length - 1].botResults,
  })),
);
