import { put, takeEvery, all, call } from 'redux-saga/effects';
import axios from 'axios';

export const API_BASE = process.env.API_URL;
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

  try {
    const { data } = yield call(axios.request, prepareAxiosParams(request));

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
