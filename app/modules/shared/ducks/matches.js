import { put, takeEvery, call, all } from 'redux-saga/effects';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import FileSaver from 'file-saver';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';

const actionTypes = {
  DOWNLOAD_FILES_REQUEST: 'app/shared/matches/DOWNLOAD_FILES_REQUEST',
  DOWNLOAD_FILES_SUCCESS: 'app/shared/matches/DOWNLOAD_FILES_SUCCESS',
  DOWNLOAD_FILES_FAILURE: 'app/shared/matches/DOWNLOAD_FILES_FAILURE',
};

export function downloadFiles(
  matchExecutionId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.DOWNLOAD_FILES_REQUEST,
    payload: {
      matchExecutionId,
      successCallback,
      failureCallback,
    },
  };
}

/*
 * Sagas
 */
function* handleDownloadFiles({
  payload: { matchExecutionId, successCallback, failureCallback },
}) {
  const { data, status } = yield call(callApi, {
    endpoint: `api/match-execution/${matchExecutionId}/download`,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.DOWNLOAD_FILES_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    const blob = new Blob([data], { type: 'application/zip' });
    FileSaver.saveAs(blob, `match_execution_${matchExecutionId}.zip`);
  } else {
    yield put({
      type: actionTypes.DOWNLOAD_FILES_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

export function* saga() {
  yield all([
    takeEvery(actionTypes.DOWNLOAD_FILES_REQUEST, handleDownloadFiles),
  ]);
}
