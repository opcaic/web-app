import { all, call, put, takeEvery } from 'redux-saga/effects';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import JSZip from 'jszip';
import { fromJS } from 'immutable';
import { defineMessages } from 'react-intl';
import { notification } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import FileSaver from 'file-saver';
import filesize from 'filesize';
import { createSelector } from 'reselect';

const intlMessages = defineMessages({
  uploadSuccessNotification: {
    id: 'app.admin.tournamentFilesUpload.uploadSuccessNotification',
  },
});

/*
 * Action types
 */
export const actionTypes = {
  TOURNAMENT_FILES_UPLOAD:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_UPLOAD',
  TOURNAMENT_FILES_UPLOAD_REQUEST:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_UPLOAD_REQUEST',
  TOURNAMENT_FILES_UPLOAD_SUCCESS:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_UPLOAD_SUCCESS',
  TOURNAMENT_FILES_UPLOAD_FAILURE:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_UPLOAD_FAILURE',
  TOURNAMENT_FILES_DOWNLOAD:
    'app/shared/tournamentFilesDOWNLOAD/TOURNAMENT_FILES_DOWNLOAD',
  TOURNAMENT_FILES_DOWNLOAD_REQUEST:
    'app/shared/tournamentFilesDownload/TOURNAMENT_FILES_DOWNLOAD_REQUEST',
  TOURNAMENT_FILES_DOWNLOAD_SUCCESS:
    'app/shared/tournamentFilesDownload/TOURNAMENT_FILES_DOWNLOAD_SUCCESS',
  TOURNAMENT_FILES_DOWNLOAD_FAILURE:
    'app/shared/tournamentFilesDownload/TOURNAMENT_FILES_DOWNLOAD_FAILURE',
  TOURNAMENT_FILES_MODAL_HIDE:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_MODAL_HIDE',
  TOURNAMENT_FILES_MODAL_SHOW:
    'app/shared/tournamentFilesUpload/TOURNAMENT_FILES_MODAL_SHOW',
};

/*
 * Action creators
 */
export function uploadTournamentFiles(
  fileList,
  tournamentId,
  maxTournamentFilesSize,
  successCallback,
  failureCallback,
  progressCallback,
) {
  return {
    type: actionTypes.TOURNAMENT_FILES_UPLOAD,
    payload: {
      fileList,
      tournamentId,
      maxTournamentFilesSize,
      successCallback,
      failureCallback,
      progressCallback,
    },
  };
}

export function downloadTournamentFiles(tournamentId) {
  return {
    type: actionTypes.TOURNAMENT_FILES_DOWNLOAD,
    payload: {
      tournamentId,
    },
  };
}

export function showTournamentFilesModal(tournament) {
  return {
    type: actionTypes.TOURNAMENT_FILES_MODAL_SHOW,
    payload: {
      tournament,
    },
  };
}

export function hideTournamentFilesModal() {
  return {
    type: actionTypes.TOURNAMENT_FILES_MODAL_HIDE,
  };
}

/*
 * Sagas
 */
function* handleTournamentFilesUpload({
  payload: {
    fileList,
    tournamentId,
    maxTournamentFilesSize,
    successCallback,
    failureCallback,
    progressCallback,
  },
}) {
  yield put({
    type: actionTypes.TOURNAMENT_FILES_UPLOAD_REQUEST,
  });

  let zipFile = null;

  if (fileList.length === 1 && fileList[0].type === 'application/zip') {
    // eslint-disable-next-line prefer-destructuring
    zipFile = fileList[0];
  } else {
    const zip = new JSZip();

    fileList.forEach(x => {
      zip.file(x.name, x);
    });

    const promise = new Promise(resolve => {
      zip.generateAsync({ type: 'blob' }).then(content => {
        resolve(content);
      });
    });

    zipFile = yield promise;
  }

  if (zipFile && zipFile.size > maxTournamentFilesSize) {
    yield call(
      handleTournamentFilesUploadFailure,
      {
        field: 'archive',
        code: 'tournament-files-invalid-archive-size',
        maximumSize: maxTournamentFilesSize,
      },
      failureCallback,
    );
    return;
  }

  const formData = new FormData();

  formData.append('archive', zipFile);

  const { data, status } = yield call(callApi, {
    endpoint: `api/tournaments/${tournamentId}/files`,
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: progressEvent =>
      progressCallback(
        Math.round((progressEvent.loaded * 100) / progressEvent.total),
      ),
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.TOURNAMENT_FILES_UPLOAD_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    yield put(hideTournamentFilesModal());
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.uploadSuccessNotification),
    });
  } else {
    yield call(handleTournamentFilesUploadFailure, data, failureCallback);
  }
}

function* handleTournamentFilesUploadFailure(data, failureCallback) {
  yield put({
    type: actionTypes.TOURNAMENT_FILES_UPLOAD_FAILURE,
  });

  if (data.code === 'invalid-archive-size') {
    // eslint-disable-next-line no-param-reassign
    data.maximumSize = filesize(data.maximumSize);
  }

  if (failureCallback) {
    const errors = prepareFormErrors(data, null, true);
    failureCallback(errors);
  }
}

/*
 * Sagas
 */
function* handleTournamentFilesDownload({
  payload: { tournamentId, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.TOURNAMENT_FILES_DOWNLOAD_REQUEST,
  });

  const { data, status } = yield call(callApi, {
    endpoint: `api/tournaments/${tournamentId}/files`,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.TOURNAMENT_FILES_DOWNLOAD_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    const blob = new Blob([data], { type: 'application/zip' });
    FileSaver.saveAs(blob, `tournament${tournamentId}_attachments.zip`);
  } else {
    yield put({
      type: actionTypes.TOURNAMENT_FILES_UPLOAD_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

export function* saga() {
  yield all([
    takeEvery(actionTypes.TOURNAMENT_FILES_UPLOAD, handleTournamentFilesUpload),
    takeEvery(
      actionTypes.TOURNAMENT_FILES_DOWNLOAD,
      handleTournamentFilesDownload,
    ),
  ]);
}

/*
 * Reducers
 */
export const initialState = fromJS({
  visible: false,
  tournament: null,
});

function tournamentFilesUploadReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOURNAMENT_FILES_MODAL_SHOW:
      return state
        .set('visible', true)
        .set('tournament', action.payload.tournament);
    case actionTypes.TOURNAMENT_FILES_MODAL_HIDE:
      return state.set('visible', false).set('tournament', null);
    default:
      return state;
  }
}

export default tournamentFilesUploadReducer;

const getTournamentFilesUpload = state => state.get('tournamentFilesUpload');

export const tournamentFilesUploadVisibleSelector = createSelector(
  getTournamentFilesUpload,
  state => state.get('visible'),
);

export const tournamentFilesUploadTournamentSelector = createSelector(
  getTournamentFilesUpload,
  state => state.get('tournament'),
);
