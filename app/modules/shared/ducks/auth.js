import { fromJS } from 'immutable';
import { createApiAction } from '../helpers/apiMiddleware';

/*
 * Action types
 */
export const actionTypes = {
  LOGIN: 'app/shared/auth/LOGIN',
  LOGIN_REQUEST: 'app/shared/auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'app/shared/auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'app/shared/auth/LOGIN_FAILURE',
};

/*
 * Action creators
 */
export const login = (username, password) =>
  createApiAction({
    type: actionTypes.LOGIN,
    endpoint: '/login',
    method: 'POST',
    body: {
      username,
      password,
    },
  });

/*
 * Reducers
 */
const initialState = fromJS({
  username: null,
  token: null,
  loggedIn: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return state.set('user', {
        username: action.payload.username,
        token: action.payload.token,
        loggedIn: true,
      });
    default:
      return state;
  }
}

export default authReducer;
