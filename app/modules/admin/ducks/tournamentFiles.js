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
    id: 'app.admin.tournamentFiles.uploadSuccessNotification',
  },
  deleteSuccessNotification: {
    id: 'app.admin.tournamentFiles.deleteSuccessNotification',
  },
  deleteFailureNotification: {
    id: 'app.admin.tournamentFiles.deleteFailureNotification',
  },
  tournamentNoFilesNotification: {
    id: 'app.admin.tournamentFiles.noFilesNotification',
  },
  downloadFailureNotification: {
    id: 'app.admin.tournamentFiles.downloadFailureNotification',
  },
});

/*
 * Action types
 */
export const actionTypes = {
  upload: {
    REQUEST: 'app/admin/tournamentFiles/UPLOAD_REQUEST',
    SUCCESS: 'app/admin/tournamentFiles/UPLOAD_SUCCESS',
    FAILURE: 'app/admin/tournamentFiles/UPLOAD_FAILURE',
  },
  download: {
    REQUEST: 'app/admin/tournamentFiles/DOWNLOAD_REQUEST',
    SUCCESS: 'app/admin/tournamentFiles/DOWNLOAD_SUCCESS',
    FAILURE: 'app/admin/tournamentFiles/DOWNLOAD_FAILURE',
  },
  delete: {
    REQUEST: 'app/admin/tournamentFiles/DELETE_REQUEST',
    SUCCESS: 'app/admin/tournamentFiles/DELETE_SUCCESS',
    FAILURE: 'app/admin/tournamentFiles/DELETE_FAILURE',
  },
  modal: {
    HIDE: 'app/admin/tournamentFiles/MODAL_HIDE',
    SHOW: 'app/admin/tournamentFiles/MODAL_SHOW',
  },
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
    type: actionTypes.upload.REQUEST,
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
    type: actionTypes.download.REQUEST,
    payload: {
      tournamentId,
    },
  };
}

export function deleteTournamentFiles(
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.delete.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function showTournamentFilesModal(tournament) {
  return {
    type: actionTypes.modal.SHOW,
    payload: {
      tournament,
    },
  };
}

export function hideTournamentFilesModal() {
  return {
    type: actionTypes.modal.HIDE,
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
  let zipFile = null;

  if (fileList.length === 1 && fileList[0].name.endsWith('.zip')) {
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
      type: actionTypes.upload.SUCCESS,
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
    type: actionTypes.upload.FAILURE,
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
  const { data, status } = yield call(callApi, {
    endpoint: `api/tournaments/${tournamentId}/files`,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  if (status === 200) {
    yield put({
      type: actionTypes.download.SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    const blob = new Blob([data], { type: 'application/zip' });
    FileSaver.saveAs(blob, `tournament${tournamentId}_attachments.zip`);
  } else {
    yield put({
      type: actionTypes.download.FAILURE,
    });

    if (status === 204) {
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.tournamentNoFilesNotification,
        ),
      });
    } else {
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.downloadFailureNotification,
        ),
      });
    }

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

function* handleTournamentFilesDelete({
  payload: { tournamentId, successCallback, failureCallback },
}) {
  try {
    const { status } = yield call(callApi, {
      endpoint: `api/tournaments/${tournamentId}/files`,
      method: 'DELETE',
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: actionTypes.delete.SUCCESS,
      });
      yield call(notification.success, {
        message: intlGlobal.formatMessage(
          intlMessages.deleteSuccessNotification,
        ),
      });

      if (successCallback) successCallback();
    } else {
      yield put({
        type: actionTypes.delete.FAILURE,
      });
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.deleteFailureNotification,
        ),
      });

      if (failureCallback) failureCallback();
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saga() {
  yield all([
    takeEvery(actionTypes.upload.REQUEST, handleTournamentFilesUpload),
    takeEvery(actionTypes.download.REQUEST, handleTournamentFilesDownload),
    takeEvery(actionTypes.delete.REQUEST, handleTournamentFilesDelete),
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
    case actionTypes.modal.SHOW:
      return state
        .set('visible', true)
        .set('tournament', action.payload.tournament);
    case actionTypes.modal.HIDE:
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
