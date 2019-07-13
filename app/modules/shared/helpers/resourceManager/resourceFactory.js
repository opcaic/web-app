import actionCreatorsFactory from './actionCreatorsFactory';
import actionTypesFactory from './actionTypesFactory';
import reducersFactory from './reducersFactory';

const resourceFactory = ({ endpoint, resourceName }) => {
  const apiEndpointFactory = (id = '') => `${endpoint}/${id}`;
  const actionTypes = actionTypesFactory({ resourceName });
  const actions = actionCreatorsFactory({ apiEndpointFactory, actionTypes });
  const reducers = reducersFactory({ actionTypes });

  return {
    actionTypes,
    actions,
    reducers,
  };
};

export default resourceFactory;
