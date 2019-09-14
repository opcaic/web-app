import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/validation',
  resourceName: 'validations',
});

export default reducers;
