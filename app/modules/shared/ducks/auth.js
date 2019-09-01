import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
import Cookies from 'js-cookie';
import {
  all,
  call,
  cancel,
  fork,
  put,
  select,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import { callApi } from '../helpers/apiMiddleware';
import { routerStateSelector } from '@/modules/shared/selectors/router';
import {
  currentUserSelector,
  refreshTokenSelector,
} from '@/modules/shared/selectors/auth';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';

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

export function loadAuthFailure() {
  return {
    type: actionTypes.LOAD_AUTH_FAILURE,
  };
}

export function login(
  email,
  password,
  rememberMe,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.LOGIN,
    payload: {
      email,
      password,
      rememberMe,
      successCallback,
      failureCallback,
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

/*
 * Implementation of the main login flow.
 */
function* loginFlow() {
  while (true) {
    let action = yield take([actionTypes.LOGIN, actionTypes.LOAD_AUTH_SUCCESS]);

    let task;

    if (action.type === actionTypes.LOGIN) {
      const {
        payload: {
          email,
          password,
          rememberMe,
          successCallback,
          failureCallback,
        },
      } = action;
      task = yield fork(
        authenticate,
        email,
        password,
        rememberMe,
        successCallback,
        failureCallback,
      );
    }

    const refreshTask = yield fork(handleRefreshToken, action);

    action = yield take([
      actionTypes.LOGOUT_REQUEST,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOAD_AUTH_FAILURE,
    ]);

    clearStorages();

    if (refreshTask) yield cancel(refreshTask);
    if (action.type === actionTypes.LOGOUT_REQUEST) {
      if (task) yield cancel(task);
      yield put(logoutSuccess());
      yield put(push('/'));
    }
  }
}

/*
 * Tries to authenticate with given credentials
 */
function* authenticate(
  email,
  password,
  rememberMe,
  successCallback,
  failureCallback,
) {
  yield put({
    type: actionTypes.LOGIN_REQUEST,
  });

  try {
    const { data, status } = yield call(callApi, {
      endpoint: 'api/users/login',
      method: 'POST',
      data: {
        email,
        password,
      },
    });

    if (status >= 200 && status < 300) {
      // Dispatch success action
      yield put({
        type: actionTypes.LOGIN_SUCCESS,
        payload: Object.assign({ useLocalStorage: rememberMe }, data),
      });

      if (successCallback) {
        successCallback();
      }

      // Save data to local storage
      setAuthData(data, rememberMe);

      // Redirect to previous location if possible
      const routerState = yield select(routerStateSelector);
      const { from } = routerState || {
        from: { pathname: '/' },
      };
      yield put(push(from));
    } else {
      yield put({
        type: actionTypes.LOGIN_FAILURE,
      });

      if (failureCallback) {
        const errors = prepareFormErrors(data);
        failureCallback(errors);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

/*
 * Periodically tries to refresh access and refresh tokens
 */
function* handleRefreshToken() {
  const currentUser = yield select(currentUserSelector);

  while (yield call(delay, 45 * 1000)) {
    const refreshToken = yield select(refreshTokenSelector);
    yield call(
      refreshTokenSaga,
      currentUser.id,
      refreshToken,
      currentUser.useLocalStorage,
    );
  }
}

function* refreshTokenSaga(userId, refreshToken, useLocalStorage) {
  const { data, status } = yield call(callApi, {
    endpoint: `api/users/${userId}/refresh`,
    method: 'POST',
    data: {
      token: refreshToken,
    },
  });

  if (status !== 200) {
    return null;
  }

  yield put(updateTokens(data.accessToken, data.refreshToken));

  const oldUser = getAuthData(useLocalStorage);
  const user = Object.assign({}, oldUser, data);

  setAuthData(user, useLocalStorage);

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

function* handleLoadAuth() {
  try {
    // Try to load auth information from local storage
    let authString = localStorage.getItem('auth');
    let useLocalStorage = true;

    // If nothing found in local storage, try cookies
    if (authString === 'null') {
      authString = Cookies.get('auth');
      useLocalStorage = false;
    }

    const auth = authString && JSON.parse(authString);

    if (!auth) {
      yield put(loadAuthFailure(new Error('Auth could not be loaded')));
      return;
    }

    const decodedToken = jwtDecode(auth.refreshToken);

    // Subtract 5 seconds from the token to account for network lag
    if (decodedToken.exp * 1000 - 5000 < new Date().getTime()) {
      yield put(loadAuthFailure(new Error('Refresh token is expired')));
      return;
    }

    const refreshedTokens = yield call(
      refreshTokenSaga,
      auth.id,
      auth.refreshToken,
      useLocalStorage,
    );

    if (refreshedTokens !== null) {
      yield put(
        loadAuthSuccess(
          Object.assign({ useLocalStorage }, auth, refreshedTokens),
        ),
      );
    } else {
      yield put(loadAuthFailure());
    }
  } catch (e) {
    console.log(e);
  }
}

/*
 * Helper functions
 */
function getAuthData(useLocalStorage) {
  let dataString = null;

  if (useLocalStorage) {
    dataString = localStorage.getItem('auth');
  } else {
    dataString = Cookies.get('auth');
  }

  if (dataString) {
    return JSON.parse(dataString);
  }

  return null;
}

function setAuthData(data, useLocalStorage) {
  if (useLocalStorage) {
    localStorage.setItem('auth', JSON.stringify(data));
    console.log('Set local storage');
  } else {
    Cookies.set('auth', JSON.stringify(data));
    console.log('Set cookies');
  }
}

function clearStorages() {
  localStorage.setItem('auth', null);
  Cookies.set('auth', null);
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
  accessToken: null,
  refreshToken: null,
  role: null,
  initialLoadCompleted: false,
  useLocalStorage: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_AUTH_SUCCESS:
    case actionTypes.LOGIN_SUCCESS:
      return state
        .set('id', action.payload.id)
        .set('accessToken', action.payload.accessToken)
        .set('refreshToken', action.payload.refreshToken)
        .set('role', action.payload.role)
        .set('initialLoadCompleted', true)
        .set('useLocalStorage', action.payload.useLocalStorage);
    case actionTypes.LOAD_AUTH_FAILURE:
      return state.set('initialLoadCompleted', true);
    case actionTypes.LOGOUT_SUCCESS:
      return initialState.set('initialLoadCompleted', true);
    case actionTypes.TOKENS_UPDATED:
      return state
        .set('accessToken', action.payload.accessToken)
        .set('refreshToken', action.payload.refreshToken);
    default:
      return state;
  }
}

export default authReducer;
