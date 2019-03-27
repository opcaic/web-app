import { put, takeEvery, all } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { fetchCompetitionsSuccess } from './actions';
import { FETCH_COMPETITIONS_REQUEST } from './constants';
import mockData from './mockData';

function* handleCompetitions() {
  yield delay(1000); // TODO: simulate network lag
  yield put(fetchCompetitionsSuccess(mockData));
}

// Root saga
export default function* rootSaga() {
  yield all([takeEvery(FETCH_COMPETITIONS_REQUEST, handleCompetitions)]);
}
