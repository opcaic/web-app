import resourceFactory from '../../shared/helpers/resourceManager';

const { actions, actionTypes, reducers } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

export { actions, actionTypes };
export default reducers;
