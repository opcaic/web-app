import { fromJS } from 'immutable';
import { put, takeEvery, all, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { callApi } from '../helpers/apiMiddleware';

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
export function register(username, password, errorsCallback) {
  return {
    type: actionTypes.REGISTER,
    username,
    password,
    errorsCallback,
  };
}

/*
 * Sagas
 */
function* handleRegister({ username, password, errorsCallback }) {
  yield put({
    type: actionTypes.REGISTER_REQUEST,
  });

  try {
    yield call(callApi, {
      endpoint: '/register',
      method: 'POST',
      body: {
        username,
        password,
      },
    });

    yield put({
      type: actionTypes.REGISTER_SUCCESS,
    });

    yield put(push('/login'));
  } catch (e) {
    yield put({
      type: actionTypes.REGISTER_FAILURE,
      errors: {
        username: 'Server-side validation error',
      },
    });

    errorsCallback({
      username: ['Server-side validation error'],
    });
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
