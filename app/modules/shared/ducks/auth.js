import { fromJS } from 'immutable';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { callApi } from '../helpers/apiMiddleware';

/*
 * Action types
 */
export const actionTypes = {
  LOGIN: 'app/shared/auth/LOGIN',
  LOGIN_REQUEST: 'app/shared/auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'app/shared/auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'app/shared/auth/LOGIN_FAILURE',
  LOGOUT: 'app/shared/auth/LOGOUT',
};

/*
 * Action creators
 */
export function login(email, password, errorsCallback) {
  return {
    type: actionTypes.LOGIN,
    email,
    password,
    errorsCallback,
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT,
  };
}

/*
 * Sagas
 */
function* handleLogin({ email, password, errorsCallback }) {
  yield put({
    type: actionTypes.LOGIN_REQUEST,
  });

  try {
    const { data } = yield call(callApi, {
      endpoint: '/api/users/login',
      method: 'POST',
      body: {
        email,
        password,
      },
    });

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
    });

    yield put(push('/'));
  } catch (e) {
    yield put({
      type: actionTypes.LOGIN_FAILURE,
    });

    console.log(e.response);

    errorsCallback({
      username: ['Server-side validation error'],
    });
  }
}

function* handleLogout() {
  yield put(push('/'));
}

export function* saga() {
  yield all([
    takeEvery(actionTypes.LOGIN, handleLogin),
    takeEvery(actionTypes.LOGOUT, handleLogout),
  ]);
}

/*
 * Reducers
 */
const initialState = fromJS({
  id: null,
  email: null,
  token: null,
  role: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return state.merge(action.payload);
    case actionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
