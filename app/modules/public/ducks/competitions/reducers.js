import { fromJS } from 'immutable';

import { FETCH_COMPETITIONS_SUCCESS } from './constants';

const initialState = fromJS({});

function competitionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITIONS_SUCCESS:
      return state.set('competitions', action.payload.competitions);
    default:
      return state;
  }
}

export default competitionsReducer;
