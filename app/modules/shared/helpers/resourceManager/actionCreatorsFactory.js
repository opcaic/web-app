import { createApiAction } from '../apiMiddleware';

const actionCreatorsFactory = ({ actionTypes, apiEndpointFactory }) => {
  const fetchMany = apiOptions =>
    createApiAction({
      type: actionTypes.FETCH_MANY,
      url: apiEndpointFactory(),
      method: 'GET',
      ...apiOptions,
    });

  const fetchResource = id =>
    createApiAction({
      type: actionTypes.FETCH,
      url: apiEndpointFactory(id),
      method: 'GET',
    });

  const updateResource = (id, body) =>
    createApiAction({
      type: actionTypes.UPDATE,
      url: apiEndpointFactory(id),
      method: 'PUT',
      body,
    });

  return {
    fetchMany,
    fetchResource,
    updateResource,
  };
};

export default actionCreatorsFactory;
