import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/submissions',
  resourceName: 'invalidSubmissions',
});

export default reducers;
