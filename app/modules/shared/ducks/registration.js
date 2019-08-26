import { fromJS } from 'immutable';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { callApi } from '../helpers/apiMiddleware';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';

/*
 * Action types
 */
export const actionTypes = {
  REGISTER: 'app/shared/auth/REGISTER',
  REGISTER_REQUEST: 'app/shared/registration/REGISTER_REQUEST',
  REGISTER_SUCCESS: 'app/shared/registration/REGISTER_SUCCESS',
  REGISTER_FAILURE: 'app/shared/registration/REGISTER_FAILURE',
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
    username,
    email,
    password,
    successCallback,
    failureCallback,
  };
}

/*
 * Sagas
 */
function* handleRegister({
  username,
  email,
  password,
  successCallback,
  failureCallback,
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

export function* saga() {
  yield all([takeEvery(actionTypes.REGISTER, handleRegister)]);
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
