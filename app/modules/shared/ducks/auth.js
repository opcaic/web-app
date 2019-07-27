import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import {
  all,
  call,
  put,
  takeEvery,
  select,
  take,
  fork,
  cancel,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import { callApi } from '../helpers/apiMiddleware';
import { routerStateSelector } from '@/modules/shared/selectors/router';
import {
  currentUserSelector,
  refreshTokenSelector,
} from '@/modules/shared/selectors/auth';

/*
 * Action types
 */
export const actionTypes = {
  LOGIN: 'app/shared/auth/LOGIN',
  LOGIN_REQUEST: 'app/shared/auth/LOGIN_REQUEST',
  LOGIN_SUCCESS: 'app/shared/auth/LOGIN_SUCCESS',
  LOGIN_FAILURE: 'app/shared/auth/LOGIN_FAILURE',
  LOGOUT_REQUEST: 'app/shared/auth/LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'app/shared/auth/LOGOUT_SUCCESS',
  TOKENS_UPDATED: 'app/shared/auth/TOKENS_UPDATED',
  LOAD_AUTH_REQUEST: 'app/shared/auth/LOAD_AUTH_REQUEST',
  LOAD_AUTH_SUCCESS: 'app/shared/auth/LOAD_AUTH_SUCCESS',
  LOAD_AUTH_FAILURE: 'app/shared/auth/LOAD_AUTH_FAILURE',
};

/*
 * Action creators
 */
export function loadAuth() {
  return {
    type: actionTypes.LOAD_AUTH_REQUEST,
  };
}

export function loadAuthSuccess(user) {
  return {
    type: actionTypes.LOAD_AUTH_SUCCESS,
    payload: user,
  };
}

export function loadAuthFailure(error) {
  return {
    type: actionTypes.LOAD_AUTH_FAILURE,
    error,
  };
}

export function login(email, password, errorsCallback) {
  return {
    type: actionTypes.LOGIN,
    payload: {
      email,
      password,
      errorsCallback,
    },
  };
}

export function logout() {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
}

export function updateTokens(accessToken, refreshToken) {
  return {
    type: actionTypes.TOKENS_UPDATED,
    payload: {
      accessToken,
      refreshToken,
    },
  };
}

/*
 * Sagas
 */
function* loginFlow() {
  while (true) {
    let action = yield take([actionTypes.LOGIN, actionTypes.LOAD_AUTH_SUCCESS]);

    let task;

    if (action.type === actionTypes.LOGIN) {
      const {
        payload: { email, password, errorsCallback },
      } = action;
      task = yield fork(authorize, email, password, errorsCallback);
    }

    const refreshTask = yield fork(handleRefreshToken, action);

    action = yield take([
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOAD_AUTH_FAILURE,
    ]);

    localStorage.setItem('user', null);

    if (refreshTask) yield cancel(refreshTask);
    if (action.type === actionTypes.LOGOUT_REQUEST) {
      if (task) yield cancel(task);
      yield put(logoutSuccess());
      yield put(push('/'));
    }
  }
}

function* authorize(email, password, errorsCallback) {
  yield put({
    type: actionTypes.LOGIN_REQUEST,
  });

  try {
    const { data } = yield call(callApi, {
      endpoint: '/api/users/login',
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    const token = jwtDecode(data.accessToken);
    console.log(token);

    yield put({
      type: actionTypes.LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('user', JSON.stringify(data));

    const routerState = yield select(routerStateSelector);
    console.log(routerState);
    const { from } = routerState || {
      from: { pathname: '/' },
    };
    console.log(from);
    const redirectTo = from; // TODO: handle search and hash

    yield put(push(redirectTo));
  } catch (e) {
    yield put({
      type: actionTypes.LOGIN_FAILURE,
    });

    console.log(e);

    errorsCallback({
      username: ['Server-side validation error'],
    });
  }
}

function* handleRefreshToken(action) {
  try {
    if (action.type === actionTypes.LOAD_AUTH_SUCCESS) {
      yield call(refreshTokenSaga);
    }

    while (yield call(delay, 1800 * 1000)) {
      yield call(refreshTokenSaga);
    }
  } catch (error) {
    console.log(error);
  }
}

function* refreshTokenSaga() {
  const refreshToken = yield select(refreshTokenSelector);
  const currentUser = yield select(currentUserSelector);

  const { data } = yield call(callApi, {
    endpoint: `/api/users/${currentUser.id}/refresh`,
    method: 'POST',
    data: {
      token: refreshToken,
    },
  });

  yield put(updateTokens(data.accessToken, data.refreshToken));

  let oldUser = localStorage.getItem('user');
  oldUser = JSON.parse(oldUser);

  const user = Object.assign({}, oldUser, data);

  localStorage.setItem('user', JSON.stringify(user));
}

function* handleLoadAuth() {
  try {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    if (user === null) {
      yield put(
        loadAuthFailure(
          new Error('User could not be loaded from local storage'),
        ),
      );
      return;
    }

    const refreshToken = jwtDecode(user.refreshToken);

    // Subtract 5 seconds from the token to account for network lag
    if (refreshToken.exp * 1000 - 5000 < new Date().getTime()) {
      yield put(loadAuthFailure(new Error('Refresh token is expired')));
      return;
    }

    yield put(loadAuthSuccess(user));
  } catch (e) {
    yield put(loadAuthFailure(e));
  }
}

export function* saga() {
  yield all([
    call(loginFlow),
    takeEvery(actionTypes.LOAD_AUTH_REQUEST, handleLoadAuth),
  ]);
}

/*
 * Reducers
 */
const initialState = fromJS({
  id: null,
  email: null,
  accessToken: null,
  refreshToken: null,
  role: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return state.merge(action.payload);
    case actionTypes.LOAD_AUTH_SUCCESS:
      return state.merge(action.payload);
    case actionTypes.LOGOUT_SUCCESS:
      return initialState;
    case actionTypes.TOKENS_UPDATED:
      return state.merge(action.payload);
    default:
      return state;
  }
}

export default authReducer;
