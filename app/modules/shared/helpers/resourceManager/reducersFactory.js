import { fromJS } from 'immutable';

const initialState = fromJS({
  // FETCH props
  items: [],
  totalItems: 0,
  isFetching: false,
  lastUpdated: 0,
  didInvalidate: true,
  // GET props
  item: null,
  isFetchingItem: false,
  lastUpdatedItem: 0,
  didInvalidateItem: true,
  // CREATE props
  isCreating: false,
  // UPDATE props
  isUpdating: false,
  isUpdatingMany: false,
  // DELETE props
  isDeleting: false,
  isDeletingMany: false,
});

const reducersFactory = ({ actionTypes }) => (state = initialState, action) => {
  switch (action.type) {
    // FETCH
    case 'app/CALL_API':
      return state.merge({
        isFetching: true,
      });
    case actionTypes.FETCH_REQUEST:
      return state.merge({
        isFetchingItem: true,
      });
    case actionTypes.FETCH_SUCCESS:
      return state.merge({
        item: action.payload,
        isFetchingItem: false,
      });
    case actionTypes.FETCH_FAILURE:
      return state.merge({
        isFetchingItem: false,
      });

    // FETCH MANY
    case actionTypes.FETCH_MANY_REQUEST:
      return state.merge({
        isFetching: true,
      });
    case actionTypes.FETCH_MANY_SUCCESS:
      return state.merge({
        items: action.payload.list,
        totalItems: action.payload.total,
        isFetching: false,
      });
    case actionTypes.FETCH_MANY_FAILURE:
      return state.merge({
        isFetching: false,
      });

    // UPDATE
    case actionTypes.UDPATE_REQUEST:
      return state.merge({
        isUpdating: true,
      });
    case actionTypes.UDPATE_SUCCESS:
      return state.merge({
        isUpdating: false,
      });
    case actionTypes.UDPATE_FAILURE:
      return state.merge({
        isUpdating: false,
      });

    // CREATE
    case actionTypes.CREATE_REQUEST:
      return state.merge({
        isCreating: true,
      });
    case actionTypes.CREATE_SUCCESS:
      return state.merge({
        isCreating: false,
      });
    case actionTypes.CREATE_FAILURE:
      return state.merge({
        isCreating: false,
      });

    // DEFAULT
    default:
      return state;
  }
};

export default reducersFactory;
