import { all, call, put, takeEvery } from 'redux-saga/effects';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { push } from 'connected-react-router';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import JSZip from 'jszip';
import { fromJS } from 'immutable';
import { defineMessages } from 'react-intl';
import { notification } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import FileSaver from 'file-saver';

const intlMessages = defineMessages({
  uploadSuccessNotification: {
    id: 'app.shared.submissionUpload.uploadSuccessNotification',
  },
});

/*
 * Action types
 */
export const actionTypes = {
  SUBMISSION_UPLOAD: 'app/shared/submissionUpload/SUBMISSION_UPLOAD',
  SUBMISSION_UPLOAD_REQUEST:
    'app/shared/submissionUpload/SUBMISSION_UPLOAD_REQUEST',
  SUBMISSION_UPLOAD_SUCCESS:
    'app/shared/submissionUpload/SUBMISSION_UPLOAD_SUCCESS',
  SUBMISSION_UPLOAD_FAILURE:
    'app/shared/submissionUpload/SUBMISSION_UPLOAD_FAILURE',
  SUBMISSION_DOWNLOAD: 'app/shared/submissionDOWNLOAD/SUBMISSION_DOWNLOAD',
  SUBMISSION_DOWNLOAD_REQUEST:
    'app/shared/submissionDOWNLOAD/SUBMISSION_DOWNLOAD_REQUEST',
  SUBMISSION_DOWNLOAD_SUCCESS:
    'app/shared/submissionDOWNLOAD/SUBMISSION_DOWNLOAD_SUCCESS',
  SUBMISSION_DOWNLOAD_FAILURE:
    'app/shared/submissionDOWNLOAD/SUBMISSION_DOWNLOAD_FAILURE',
  SUBMISSION_RUN_VALIDATION:
    'app/shared/submissionRUN_VALIDATION/SUBMISSION_RUN_VALIDATION',
  SUBMISSION_RUN_VALIDATION_REQUEST:
    'app/shared/submissionRUN_VALIDATION/SUBMISSION_RUN_VALIDATION_REQUEST',
  SUBMISSION_RUN_VALIDATION_SUCCESS:
    'app/shared/submissionRUN_VALIDATION/SUBMISSION_RUN_VALIDATION_SUCCESS',
  SUBMISSION_RUN_VALIDATION_FAILURE:
    'app/shared/submissionRUN_VALIDATION/SUBMISSION_RUN_VALIDATION_FAILURE',
  SUBMISSION_MODAL_HIDE: 'app/shared/submissionUpload/SUBMISSION_MODAL_HIDE',
  SUBMISSION_MODAL_SHOW: 'app/shared/submissionUpload/SUBMISSION_MODAL_SHOW',
};

/*
 * Action creators
 */
export function uploadSubmission(
  fileList,
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.SUBMISSION_UPLOAD,
    payload: {
      fileList,
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function downloadSubmission(submissionId) {
  return {
    type: actionTypes.SUBMISSION_DOWNLOAD,
    payload: {
      submissionId,
    },
  };
}

export function runValidation(submissionId, tournamentId) {
  return {
    type: actionTypes.SUBMISSION_RUN_VALIDATION,
    payload: {
      submissionId,
      tournamentId,
    },
  };
}

export function showSubmissionModal(tournament) {
  return {
    type: actionTypes.SUBMISSION_MODAL_SHOW,
    payload: {
      tournament,
    },
  };
}

export function hideSubmissionModal() {
  return {
    type: actionTypes.SUBMISSION_MODAL_HIDE,
  };
}

/*
 * Sagas
 */
function* handleSubmissionUpload({
  payload: { fileList, tournamentId, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.SUBMISSION_UPLOAD_REQUEST,
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

  const formData = new FormData();

  formData.append('archive', zipFile);
  formData.append('tournamentId', tournamentId);

  const { data, status } = yield call(callApi, {
    endpoint: 'api/submissions',
    method: 'POST',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.SUBMISSION_UPLOAD_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    yield put(hideSubmissionModal());
    yield put(push(`/tournaments/${tournamentId}/submissions/${data.id}`));
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.uploadSuccessNotification),
    });
  } else {
    yield put({
      type: actionTypes.SUBMISSION_UPLOAD_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

/*
 * Sagas
 */
function* handleSubmissionDownload({
  payload: { submissionId, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.SUBMISSION_DOWNLOAD_REQUEST,
  });

  const { data, status } = yield call(callApi, {
    endpoint: `api/submissions/${submissionId}/download`,
    method: 'GET',
    responseType: 'arraybuffer',
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.SUBMISSION_DOWNLOAD_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    const blob = new Blob([data], { type: 'application/zip' });
    FileSaver.saveAs(blob, `submission_${submissionId}.zip`);
  } else {
    yield put({
      type: actionTypes.SUBMISSION_UPLOAD_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

function* handleRunValidation({
  payload: { submissionId, tournamentId, successCallback, failureCallback },
}) {
  yield put({
    type: actionTypes.SUBMISSION_RUN_VALIDATION_REQUEST,
  });

  const { data, status } = yield call(callApi, {
    endpoint: `api/submissions/${submissionId}/validate`,
    method: 'POST',
    data: { id: submissionId },
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: actionTypes.SUBMISSION_RUN_VALIDATION_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    yield put(
      push(`/admin/tournaments/${tournamentId}/submissions/${submissionId}`),
    );
  } else {
    yield put({
      type: actionTypes.SUBMISSION_RUN_VALIDATION_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data);
      failureCallback(errors);
    }
  }
}

export function* saga() {
  yield all([
    takeEvery(actionTypes.SUBMISSION_UPLOAD, handleSubmissionUpload),
    takeEvery(actionTypes.SUBMISSION_DOWNLOAD, handleSubmissionDownload),
    takeEvery(actionTypes.SUBMISSION_RUN_VALIDATION, handleRunValidation),
  ]);
}

/*
 * Reducers
 */
export const initialState = fromJS({
  visible: false,
  tournament: null,
});

function submissionUploadReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SUBMISSION_MODAL_SHOW:
      return state
        .set('visible', true)
        .set('tournament', action.payload.tournament);
    case actionTypes.SUBMISSION_MODAL_HIDE:
      return state.set('visible', false).set('tournament', null);
    default:
      return state;
  }
}

export default submissionUploadReducer;
