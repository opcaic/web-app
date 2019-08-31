import { createSelector } from 'reselect';
import { transformTournamentForList } from '@/modules/public/helpers/tournaments';

const getTournamentsItems = state => state.getIn(['tournaments', 'items']);

export const getTournamentsListItems = createSelector(
  getTournamentsItems,
  items => items.toJS().map(transformTournamentForList),
);
