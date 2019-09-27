import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  resourceName: 'leaderboards',
  apiEndpointFactory: (id = '') => `api/tournaments/${id}/leaderboard`,
});

export default reducers;
