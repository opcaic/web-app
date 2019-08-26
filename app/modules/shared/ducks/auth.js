import { fromJS } from 'immutable';
import { delay } from 'redux-saga';
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

export function login(email, password, successCallback, failureCallback) {
  return {
    type: actionTypes.LOGIN,
    payload: {
      email,
      password,
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
function* loginFlow() {
  while (true) {
    let action = yield take([actionTypes.LOGIN, actionTypes.LOAD_AUTH_SUCCESS]);

    let task;

    if (action.type === actionTypes.LOGIN) {
      const {
        payload: { email, password, successCallback, failureCallback },
      } = action;
      task = yield fork(
        authenticate,
        email,
        password,
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

    localStorage.setItem('auth', null);

    if (refreshTask) yield cancel(refreshTask);
    if (action.type === actionTypes.LOGOUT_REQUEST) {
      if (task) yield cancel(task);
      yield put(logoutSuccess());
      yield put(push('/'));
    }
  }
}

function* authenticate(email, password, successCallback, failureCallback) {
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
        payload: data,
      });

      if (successCallback) {
        successCallback();
      }

      // Save data to local storage
      // TODO: if the user does not want the password to be remembered, maybe use cookies?
      localStorage.setItem('auth', JSON.stringify(data));

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

function* handleRefreshToken() {
  try {
    const currentUser = yield select(currentUserSelector);

    while (yield call(delay, 45 * 1000)) {
      const refreshToken = yield select(refreshTokenSelector);
      yield call(refreshTokenSaga, currentUser.id, refreshToken);
    }
  } catch (error) {
    console.log(error);
  }
}

function* refreshTokenSaga(userId, refreshToken) {
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

  let oldUser = localStorage.getItem('auth');
  oldUser = JSON.parse(oldUser);

  const user = Object.assign({}, oldUser, data);

  localStorage.setItem('auth', JSON.stringify(user));

  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
}

function* handleLoadAuth() {
  try {
    const authString = localStorage.getItem('auth');
    const auth = JSON.parse(authString);

    if (auth === null) {
      yield put(
        loadAuthFailure(
          new Error('Auth could not be loaded from local storage'),
        ),
      );
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
    );

    if (refreshedTokens !== null) {
      yield put(loadAuthSuccess(Object.assign({}, auth, refreshedTokens)));
    } else {
      yield put(loadAuthFailure());
    }
  } catch (e) {
    console.log(e);
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
  accessToken: null,
  refreshToken: null,
  role: null,
  initialLoadCompleted: false,
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
        .set('initialLoadCompleted', true);
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
