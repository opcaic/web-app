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

  return {
    fetchMany,
    fetchResource,
    updateResource,
  };
};

export default actionCreatorsFactory;
