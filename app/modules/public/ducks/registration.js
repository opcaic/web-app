import { fromJS } from 'immutable';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { callApi } from '../../shared/helpers/apiMiddleware';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';

/*
 * Action types
 */
export const actionTypes = {
  REGISTER: 'app/shared/auth/REGISTER',
  REGISTER_REQUEST: 'app/shared/registration/REGISTER_REQUEST',
  REGISTER_SUCCESS: 'app/shared/registration/REGISTER_SUCCESS',
  REGISTER_FAILURE: 'app/shared/registration/REGISTER_FAILURE',
  CONFIRM_EMAIL: 'app/shared/auth/CONFIRM_EMAIL',
  CONFIRM_EMAIL_REQUEST: 'app/shared/registration/CONFIRM_EMAIL_REQUEST',
  CONFIRM_EMAIL_SUCCESS: 'app/shared/registration/CONFIRM_EMAIL_SUCCESS',
  CONFIRM_EMAIL_FAILURE: 'app/shared/registration/CONFIRM_EMAIL_FAILURE',
};

/*
 * Action creators
 */
export function register(
  username,
  email,
  password,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.REGISTER,
    payload: {
      username,
      email,
      password,
      successCallback,
      failureCallback,
    },
  };
}

export function confirmEmail(email, token, successCallback, failureCallback) {
  return {
    type: actionTypes.CONFIRM_EMAIL,
    payload: {
      email,
      token,
      successCallback,
      failureCallback,
    },
  };
}

/*
 * Sagas
 */
function* handleRegister({
  payload: { username, email, password, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.REGISTER_REQUEST,
  });

  try {
    const { data, status } = yield call(callApi, {
      endpoint: 'api/users',
      method: 'POST',
      data: {
        username,
        email,
        password,
        localizationLanguage: 'en',
      },
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: actionTypes.REGISTER_SUCCESS,
      });

      if (successCallback) {
        successCallback();
      }

      yield put(push(`/registration-successful?email=${email}`));
    } else {
      yield put({
        type: actionTypes.REGISTER_FAILURE,
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

function* handleConfirmEmail({
  payload: { email, token, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.CONFIRM_EMAIL_REQUEST,
  });

  try {
    const { data, status } = yield call(callApi, {
      endpoint: 'api/users/emailVerification',
      method: 'POST',
      data: {
        email,
        token,
      },
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: actionTypes.CONFIRM_EMAIL_SUCCESS,
      });

      if (successCallback) {
        successCallback();
      }
    } else {
      yield put({
        type: actionTypes.CONFIRM_EMAIL_FAILURE,
      });

      if (failureCallback) {
        const errors = prepareFormErrors(data);
        failureCallback(errors);
      }
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export function* saga() {
  yield all([takeEvery(actionTypes.REGISTER, handleRegister)]);
  yield all([takeEvery(actionTypes.CONFIRM_EMAIL, handleConfirmEmail)]);
}

/*
 * Reducers
 */
const initialState = fromJS({});

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER:
      return state.set('registration', {});

    case actionTypes.REGISTER_FAILURE:
      return state.set('registration', {
        errors: action.errors,
      });

    default:
      return state;
  }
}

export default registrationReducer;
