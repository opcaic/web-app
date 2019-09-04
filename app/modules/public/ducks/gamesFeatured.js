import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/games',
  resourceName: 'gamesFeatured',
});

export default reducers;
