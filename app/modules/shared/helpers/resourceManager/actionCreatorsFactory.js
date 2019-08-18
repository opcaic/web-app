import { createApiAction } from '../apiMiddleware';

const actionCreatorsFactory = ({ actionTypes, apiEndpointFactory }) => {
  const fetchMany = (queryParams, options = {}) =>
    createApiAction(
      {
        type: actionTypes.FETCH_MANY,
        endpoint: apiEndpointFactory(undefined, options.endpointParams),
        method: 'GET',
        params: queryParams,
        ...options.request,
      },
      options.meta,
    );

  const fetchResource = (id, options = {}) =>
    createApiAction(
      {
        type: actionTypes.FETCH,
        endpoint: apiEndpointFactory(id, options.endpointParams),
        method: 'GET',
        ...options.request,
      },
      options.meta,
    );

  const updateResource = (id, data, options = {}) =>
    createApiAction(
      {
        type: actionTypes.UPDATE,
        endpoint: apiEndpointFactory(id, options.endpointParams),
        method: 'PUT',
        data,
        ...options.request,
      },
      options.meta,
    );

  const createResource = (data, options = {}) =>
    createApiAction(
      {
        type: actionTypes.CREATE,
        endpoint: apiEndpointFactory(undefined, options.endpointParams),
        method: 'POST',
        data,
        ...options.request,
      },
      options.meta,
    );

  return {
    fetchMany,
    fetchResource,
    updateResource,
    createResource,
  };
};

export default actionCreatorsFactory;
