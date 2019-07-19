import resourceFactory from '../../shared/helpers/resourceManager';

const { actions, actionTypes, reducers } = resourceFactory({
  endpoint: '/api/users',
  resourceName: 'users',
});

export { actions, actionTypes };
export default reducers;
