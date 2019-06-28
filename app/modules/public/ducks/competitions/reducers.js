import { fromJS } from 'immutable';

import { FETCH_COMPETITIONS_SUCCESS } from './constants';
import resourceFactory from '../../../shared/helpers/resourceManager';

const { actions, actionTypes } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

const initialState = fromJS({});

function competitionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COMPETITIONS_SUCCESS:
      return state.set('competitions', action.payload);
    default:
      return state;
  }
}

export { actions, actionTypes };
export default competitionsReducer;
