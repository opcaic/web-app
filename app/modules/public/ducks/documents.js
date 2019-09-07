import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/documents',
  resourceName: 'documents',
});

export default reducers;
