import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  isLoggedIn as isLoggedInSelector,
  accessTokenSelector,
} from '../selectors/auth';
import { prepareFormErrorsFromResponse } from '@/modules/shared/helpers/errors/errors';

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
    ...rest,
  };
}

export const callApi = request => axios.request(prepareAxiosParams(request));

function* handleApiCalls({ request, meta = {} }) {
  const { type } = request;

  yield put({
    type: `${type}_REQUEST`,
    payload: request,
  });

  const requestParams = prepareAxiosParams(request);
  const isLoggedIn = yield select(isLoggedInSelector);

  if (isLoggedIn) {
    const accessToken = yield select(accessTokenSelector);
    requestParams.headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const { data } = yield call(axios.request, requestParams);

    yield put({
      type: `${type}_SUCCESS`,
      payload: data,
    });

    if (meta.successCallback) {
      meta.successCallback();
    }
  } catch (e) {
    yield put({
      type: `${type}_FAILURE`,
      exception: e,
    });

    const errors = prepareFormErrorsFromResponse(e.response);

    if (meta.failureCallback) {
      meta.failureCallback(errors);
    }
  }
}

export function* apiSaga() {
  yield all([takeEvery(CALL_API, handleApiCalls)]);
}
