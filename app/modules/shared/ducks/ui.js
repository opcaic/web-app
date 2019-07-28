import { fromJS } from 'immutable';

/*
 * Action types
 */
export const actionTypes = {
  MENU_SYNC: 'app/shared/ui/MENU_SYNC',
};

/*
 * Action creators
 */
export function syncMenu(menuName, activeItems) {
  return {
    type: actionTypes.MENU_SYNC,
    payload: {
      menuName,
      activeItems,
    },
  };
}

/*
 * Reducers
 */
const initialState = fromJS({
  menu: {},
});

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.MENU_SYNC:
      return state.setIn(
        ['menu', action.payload.menuName],
        fromJS(action.payload.activeItems),
      );

    default:
      return state;
  }
}

export default registrationReducer;
