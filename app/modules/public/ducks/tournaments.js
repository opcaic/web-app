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

export const leaderboard = [
  {
    name: 'John Doe',
    place: 1,
    score: 536,
    organization: 'MFF UK',
  },
  {
    name: 'random_username_5648',
    place: 2,
    score: 515,
    organization: '',
  },
  {
    name: 'javaTryhard123',
    place: 3,
    score: 487,
    organization: 'MIT',
  },
  {
    name: 'random_username_6454',
    place: 4,
    score: 402,
    organization: 'ČVUT',
  },
  {
    name: 'random_username_4566',
    place: 5,
    score: 312,
    organization: '',
  },
  {
    name: 'random_username_9865',
    place: 6,
    score: 291,
    organization: '',
  },
];

export default reducers;
