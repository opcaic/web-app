import { put, takeEvery, all, call } from 'redux-saga/effects';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';

/*
 * Action types
 */
export const actionTypes = {
  FORGOT_PASSWORD: 'app/public/account/FORGOT_PASSWORD',
  FORGOT_PASSWORD_REQUEST: 'app/public/account/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_SUCCESS: 'app/public/account/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: 'app/public/account/FORGOT_PASSWORD_FAILURE',
  RESET_PASSWORD: 'app/public/account/RESET_PASSWORD',
  RESET_PASSWORD_REQUEST: 'app/public/account/RESET_PASSWORD_REQUEST',
  RESET_PASSWORD_SUCCESS: 'app/public/account/RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILURE: 'app/public/account/RESET_PASSWORD_FAILURE',
};

/*
 * Action creators
 */
export function forgotPassword(email, successCallback, failureCallback) {
  return {
    type: actionTypes.FORGOT_PASSWORD,
    payload: {
      email,
      successCallback,
      failureCallback,
    },
  };
}

export function resetPassword(
  email,
  resetToken,
  password,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.RESET_PASSWORD,
    payload: {
      email,
      resetToken,
      password,
      successCallback,
      failureCallback,
    },
  };
}

/*
 * Sagas
 */
function* handleForgotPassword({
  payload: { email, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.FORGOT_PASSWORD_REQUEST,
  });

  try {
    const { data, status } = yield call(callApi, {
      endpoint: 'api/users/forgotPassword',
      method: 'POST',
      data: {
        email,
      },
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: actionTypes.FORGOT_PASSWORD_SUCCESS,
      });

      if (successCallback) {
        successCallback();
      }
    } else {
      yield put({
        type: actionTypes.FORGOT_PASSWORD_FAILURE,
      });

      if (failureCallback) {
        const errors = prepareFormErrors(data);
        failureCallback(errors);
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

function* handleResetPassword({
  payload: { email, resetToken, password, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.RESET_PASSWORD_REQUEST,
  });

  try {
    const { data, status } = yield call(callApi, {
      endpoint: 'api/users/passwordReset',
      method: 'POST',
      data: {
        email,
        resetToken,
        password,
      },
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: actionTypes.RESET_PASSWORD_SUCCESS,
      });

      if (successCallback) {
        successCallback();
      }
    } else {
      yield put({
        type: actionTypes.RESET_PASSWORD_FAILURE,
      });

      if (failureCallback) {
        if (
          Array.isArray(data.errors) &&
          !data.errors.find(x => x.field !== 'password')
        ) {
          const errors = prepareFormErrors(data);
          failureCallback(errors);
        } else {
          const errors = prepareFormErrors({
            code: 'reset-password-failure',
          });
          failureCallback(errors);
        }
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function* saga() {
  yield all([takeEvery(actionTypes.FORGOT_PASSWORD, handleForgotPassword)]);
  yield all([takeEvery(actionTypes.RESET_PASSWORD, handleResetPassword)]);
}
