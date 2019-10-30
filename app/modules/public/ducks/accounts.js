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
  RESEND_CONFIRMATION_EMAIL: 'app/public/account/RESEND_CONFIRMATION_EMAIL',
  RESEND_CONFIRMATION_EMAIL_REQUEST:
    'app/public/account/RESEND_CONFIRMATION_EMAIL_REQUEST',
  RESEND_CONFIRMATION_EMAIL_SUCCESS:
    'app/public/account/RESEND_CONFIRMATION_EMAIL_SUCCESS',
  RESEND_CONFIRMATION_EMAIL_FAILURE:
    'app/public/account/RESEND_CONFIRMATION_EMAIL_FAILURE',
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

export function resendConfirmationEmail(
  email,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.RESEND_CONFIRMATION_EMAIL,
    payload: {
      email,
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
}

function* handleResetPassword({
  payload: { email, resetToken, password, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.RESET_PASSWORD_REQUEST,
  });

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
}

function* handleResendConfirmationEmail({
  payload: { email, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.RESEND_CONFIRMATION_EMAIL_REQUEST,
  });

  const { status } = yield call(callApi, {
    endpoint: 'api/users/resendVerificationEmail',
    method: 'POST',
    data: {
      email,
    },
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.RESEND_CONFIRMATION_EMAIL_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }
  } else {
    yield put({
      type: actionTypes.RESEND_CONFIRMATION_EMAIL_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors({
        code: 'resend-confirmation-email-failure',
      });
      failureCallback(errors);
    }
  }
}

export function* saga() {
  yield all([takeEvery(actionTypes.FORGOT_PASSWORD, handleForgotPassword)]);
  yield all([takeEvery(actionTypes.RESET_PASSWORD, handleResetPassword)]);
  yield all([
    takeEvery(
      actionTypes.RESEND_CONFIRMATION_EMAIL,
      handleResendConfirmationEmail,
    ),
  ]);
}
