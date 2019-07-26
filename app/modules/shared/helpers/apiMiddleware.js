import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import {
  isLoggedIn as isLoggedInSelector,
  accessTokenSelector,
} from '../selectors/auth';

export const API_BASE = 'http://localhost:5000';
export const CALL_API = 'app/CALL_API';
export const createApiAction = request => ({ type: CALL_API, request });

function prepareAxiosParams({ method, endpoint, body }) {
  return {
    method,
    url: API_BASE + endpoint,
    crossDomain: true,
    data: body,
  };
}

export const callApi = request => axios.request(prepareAxiosParams(request));

function* handleApiCalls({ request }) {
  const { type } = request;

  yield put({
    type: `${type}_REQUEST`,
  });

  const requestParams = prepareAxiosParams(request);
  const isLoggedIn = yield select(isLoggedInSelector);

  if (isLoggedIn) {
    const accessToken = yield select(accessTokenSelector);
    requestParams.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  try {
    const { data } = yield call(axios.request, requestParams);

    yield put({
      type: `${type}_SUCCESS`,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: `${type}_FAILURE`,
      exception: e,
    });
  }
}

export function* apiSaga() {
  yield all([takeEvery(CALL_API, handleApiCalls)]);
}
