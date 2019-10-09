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
  spawn,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import { callApi } from '../helpers/apiMiddleware';
import { routerStateSelector } from '@/modules/shared/selectors/router';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import { resetState, resetStateActionType } from '@/reducers';
import { changeLocale } from '@/modules/shared/ducks/localization';
import { settings } from '@/modules/shared/helpers/utils';

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
  AUTH_SUCCESS: 'app/shared/auth/AUTH_SUCCESS',
  AUTH_FAILURE: 'app/shared/auth/AUTH_FAILURE',
};

/*
 * Action creators
 */
export function loadAuthSuccess() {
  return {
    type: actionTypes.LOAD_AUTH_SUCCESS,
  };
}

export function loadAuthFailure(error) {
  return {
    type: actionTypes.LOAD_AUTH_FAILURE,
    payload: error,
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

export function loginRequest() {
  return {
    type: actionTypes.LOGIN_REQUEST,
  };
}

export function loginSuccess() {
  return {
    type: actionTypes.LOGIN_SUCCESS,
  };
}

export function loginFailure() {
  return {
    type: actionTypes.LOGIN_FAILURE,
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

export function authSuccess(id, role, rememberMe, refreshToken, accessToken) {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      id,
      role,
      rememberMe,
      refreshToken,
      accessToken,
    },
  };
}

export function authFailure(error) {
  return {
    type: actionTypes.AUTH_FAILURE,
    payload: error,
  };
}

/*
 * Sagas
 */

/*
 * Implementation of the main login flow.
 */
function* loginFlow() {
  yield spawn(handleLoadAuth);

  while (true) {
    try {
      let action = yield take([
        actionTypes.LOGIN,
        actionTypes.LOAD_AUTH_SUCCESS,
      ]);

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
        yield call(
          authenticate,
          email,
          password,
          rememberMe,
          successCallback,
          failureCallback,
        );
      }

      Cookies.set('loggedOut', false);
      const loggedOutCookieTask = yield fork(watchLoggedOutCookie, action);
      const refreshTask = yield fork(handleRefreshToken, action);

      action = yield take([
        actionTypes.LOGOUT_REQUEST,
        actionTypes.LOGIN_FAILURE,
        actionTypes.LOAD_AUTH_FAILURE,
      ]);

      clearStorage();

      if (refreshTask) yield cancel(refreshTask);
      if (loggedOutCookieTask) yield cancel(loggedOutCookieTask);
      if (action.type === actionTypes.LOGOUT_REQUEST) {
        yield put(logoutSuccess());
        yield put(push('/'));
        Cookies.set('loggedOut', true);
      }

      yield put(resetState());
    } catch (e) {
      yield put(authFailure(e));
      clearStorage();
      yield put(resetState());
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
  yield put(loginRequest());

  const { data, status } = yield call(callApi, {
    endpoint: 'api/users/login',
    method: 'POST',
    data: {
      email,
      password,
    },
  });

  if (status >= 200 && status < 300) {
    if (successCallback) {
      successCallback();
    }

    // Dispatch success action
    yield put(loginSuccess());
    yield put(
      authSuccess(
        data.id,
        data.role,
        rememberMe,
        data.refreshToken,
        data.accessToken,
      ),
    );

    // Redirect to previous location if possible
    const routerState = yield select(routerStateSelector);
    const { from } = routerState || {
      from: { pathname: '/' },
    };

    yield put(push(from));
    yield put(changeLocale(data.localizationLanguage));
  } else {
    yield put(loginFailure());

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

/*
 * Periodically tries to refresh access and refresh tokens
 */
function* handleRefreshToken() {
  while (
    yield call(delay, 1000 * parseInt(settings.authRefreshPeriodSeconds, 10))
  ) {
    yield call(refreshTokenSaga);
  }
}

function* refreshTokenSaga() {
  const authData = getAuthData();

  const { data, status } = yield call(callApi, {
    endpoint: `api/users/${authData.id}/refresh`,
    method: 'POST',
    data: {
      token: authData.refreshToken,
    },
  });

  if (status !== 200) {
    throw new Error('Could not refresh tokens');
  }

  yield put(updateTokens(data.accessToken, data.refreshToken));

  setAuthData(
    authData.id,
    authData.role,
    authData.rememberMe,
    data.refreshToken,
  );

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

/*
 * Tries to load auth data from the cookie storage
 */
function* handleLoadAuth() {
  try {
    const authData = getAuthData();

    if (!authData) {
      yield put(loadAuthFailure(new Error('Auth data could not be loaded')));
      return;
    }

    const decodedToken = jwtDecode(authData.refreshToken);

    // Subtract 5 seconds from the token to account for network lag
    if (decodedToken.exp * 1000 - 5000 < new Date().getTime()) {
      yield put(loadAuthFailure(new Error('Refresh token is expired')));
      return;
    }

    const refreshedTokens = yield call(refreshTokenSaga);

    if (refreshedTokens !== null) {
      yield put(loadAuthSuccess());
      yield put(
        authSuccess(
          authData.id,
          authData.role,
          authData.rememberMe,
          refreshedTokens.refreshToken,
          refreshedTokens.accessToken,
        ),
      );
    } else {
      yield put(loadAuthFailure());
    }
  } catch (e) {
    yield put(loadAuthFailure(e));
  }
}

/*
 * Saves auth data to cookie storage on auth success
 */
function* handleAuthSuccess(action) {
  const {
    payload: { id, role, rememberMe, refreshToken },
  } = action;

  setAuthData(id, role, rememberMe, refreshToken);
}

/*
 * Saves auth data to cookie storage on tokens updated
 */
function* handleTokensUpdated({ payload: { refreshToken } }) {
  const { id, role, rememberMe } = getAuthData();

  setAuthData(id, role, rememberMe, refreshToken);
}

/*
 * Deletes auth data from cookie storage on auth failure
 */
function* handleAuthFailure() {
  clearStorage();
}

/*
 * Periodically checks if the logged out cookie is set
 */
function* watchLoggedOutCookie() {
  while (yield call(delay, 1000)) {
    if (Cookies.get('loggedOut') === 'true') {
      yield put(logout());
    }
  }
}

/*
 * Helper functions
 */
function getAuthData() {
  const dataString = Cookies.get('auth');

  if (dataString) {
    return JSON.parse(dataString);
  }

  return null;
}

function setAuthData(id, role, rememberMe, refreshToken) {
  const options = {};

  if (rememberMe) {
    options.expires = parseInt(settings.authRememberMeDays, 10);
  }

  Cookies.set(
    'auth',
    JSON.stringify({
      id,
      role,
      rememberMe,
      refreshToken,
    }),
    options,
  );
}

function clearStorage() {
  Cookies.set('auth', null);
}

export function* saga() {
  yield all([
    call(loginFlow),
    takeEvery(actionTypes.AUTH_SUCCESS, handleAuthSuccess),
    takeEvery(actionTypes.TOKENS_UPDATED, handleTokensUpdated),
    takeEvery(
      [actionTypes.AUTH_FAILURE, actionTypes.LOAD_AUTH_FAILURE],
      handleAuthFailure,
    ),
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
  rememberMe: false,
  initialLoadCompleted: false,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return state
        .set('id', action.payload.id)
        .set('accessToken', action.payload.accessToken)
        .set('refreshToken', action.payload.refreshToken)
        .set('role', action.payload.role)
        .set('rememberMe', action.payload.rememberMe)
        .set('initialLoadCompleted', true);
    case actionTypes.LOAD_AUTH_FAILURE:
    case actionTypes.LOGOUT_SUCCESS:
    case actionTypes.AUTH_FAILURE:
    case resetStateActionType:
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
