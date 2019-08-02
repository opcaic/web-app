import { createApiAction } from '../apiMiddleware';

const actionCreatorsFactory = ({ actionTypes, apiEndpointFactory }) => {
  const fetchMany = apiOptions =>
    createApiAction({
      type: actionTypes.FETCH_MANY,
      endpoint: apiEndpointFactory(),
      method: 'GET',
      ...apiOptions,
    });

  const fetchResource = id =>
    createApiAction({
      type: actionTypes.FETCH,
      endpoint: apiEndpointFactory(id),
      method: 'GET',
    });

  const updateResource = (id, data) =>
    createApiAction({
      type: actionTypes.UPDATE,
      endpoint: apiEndpointFactory(id),
      method: 'PUT',
      data,
    });

  const createResource = data =>
    createApiAction({
      type: actionTypes.CREATE,
      endpoint: apiEndpointFactory(),
      method: 'POST',
      data,
    });

  return {
    fetchMany,
    fetchResource,
    updateResource,
    createResource,
  };
};

export default actionCreatorsFactory;
