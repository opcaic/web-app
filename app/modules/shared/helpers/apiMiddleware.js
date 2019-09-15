import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  isLoggedIn as isLoggedInSelector,
  accessTokenSelector,
} from '../selectors/auth';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';

export const API_BASE = process.env.API_URL;
export const CALL_API = 'app/CALL_API';
export const createApiAction = (request, meta) => ({
  type: CALL_API,
  request,
  meta,
});

function prepareAxiosParams({ method, endpoint, ...rest }) {
  return {
    method,
    url: API_BASE + endpoint,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    validateStatus(status) {
      return status >= 200 && status < 500;
    },
    ...rest,
  };
}

export function* callApi(request) {
  const requestParams = prepareAxiosParams(request);

  const isLoggedIn = yield select(isLoggedInSelector);

  if (isLoggedIn) {
    const accessToken = yield select(accessTokenSelector);
    requestParams.headers.Authorization = `Bearer ${accessToken}`;
  }

  return yield call(axios.request, requestParams);
}

function* handleApiCalls({ request, meta = {} }) {
  const { type } = request;

  yield put({
    type: `${type}_REQUEST`,
    payload: request,
  });

  try {
    const response = yield call(callApi, request);
    const { data, status } = response;

    if (status < 400) {
      yield put({
        type: `${type}_SUCCESS`,
        payload: data,
      });

      if (meta.successCallback) {
        meta.successCallback(data);
      }
    } else {
      yield put({
        type: `${type}_FAILURE`,
      });

      const errors = prepareFormErrors(data);

      if (meta.failureCallback) {
        meta.failureCallback(errors);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

export function* apiSaga() {
  yield all([takeEvery(CALL_API, handleApiCalls)]);
}
