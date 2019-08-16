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

  const updateResource = (id, data, apiOptions, meta) =>
    createApiAction(
      {
        type: actionTypes.UPDATE,
        endpoint: apiEndpointFactory(id),
        method: 'PUT',
        data,
        ...apiOptions,
      },
      meta,
    );

  const createResource = (data, apiOptions, meta) =>
    createApiAction(
      {
        type: actionTypes.CREATE,
        endpoint: apiEndpointFactory(),
        method: 'POST',
        data,
        ...apiOptions,
      },
      meta,
    );

  return {
    fetchMany,
    fetchResource,
    updateResource,
    createResource,
  };
};

export default actionCreatorsFactory;
