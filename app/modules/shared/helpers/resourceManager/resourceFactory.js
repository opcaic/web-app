import actionCreatorsFactory from './actionCreatorsFactory';
import actionTypesFactory from './actionTypesFactory';
import reducersFactory from './reducersFactory';
import selectorsFactory from './selectorsFactory';

const resourceFactory = ({ endpoint, resourceName, storePath }) => {
  const apiEndpointFactory = (id = '') => `${endpoint}/${id}`;
  const actionTypes = actionTypesFactory({ resourceName });
  const actions = actionCreatorsFactory({ apiEndpointFactory, actionTypes });
  const reducers = reducersFactory({ actionTypes });
  const selectors = selectorsFactory({ storePath: storePath || resourceName });

  return {
    actionTypes,
    actions,
    reducers,
    selectors,
  };
};

export default resourceFactory;
