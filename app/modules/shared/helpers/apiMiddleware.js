import { put, takeEvery, all, call } from 'redux-saga/effects';
import axios from 'axios';

export const CALL_API = 'app/CALL_API';
export const createApiAction = request => ({ type: CALL_API, request });

function* handleApiCalls({ request: { method, url, type, body } }) {
  yield put({
    type: `${type}_REQUEST`,
  });

  try {
    const { data } = yield call(axios.request, {
      method,
      url,
      crossDomain: true,
      data: body,
    });

    yield put({
      type: `${type}_SUCCESS`,
      payload: data,
    });
  } catch (e) {
    yield put({
      type: `${type}_FAILURE`,
    });
  }
}

export function* apiSaga() {
  yield all([takeEvery(CALL_API, handleApiCalls)]);
}
