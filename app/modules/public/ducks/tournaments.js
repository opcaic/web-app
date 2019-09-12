import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

export const tournamentsMenu = [
  {
    key: 'overview',
    text: 'Overview',
    path: '',
  },
  {
    key: 'leaderboard',
    text: 'Leaderboard',
    path: 'leaderboard',
  },
  {
    key: 'matches',
    text: 'Matches',
    path: 'matches',
  },
  {
    key: 'submissions',
    text: 'Submissions',
    path: 'submissions',
  },
];

export default reducers;
