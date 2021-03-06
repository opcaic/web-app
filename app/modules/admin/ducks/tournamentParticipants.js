import { all, takeLatest, take, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  resourceName: 'tournamentParticipants',
  apiEndpointFactory: (id = '', endpointParams) =>
    `api/tournaments/${endpointParams.tournamentId}/participants/${id}`,
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.tournamentParticipantForm.createSuccessNotification',
  },
  createFailureNotification: {
    id: 'app.errors.generic',
  },
  deleteSuccessNotification: {
    id: 'app.admin.tournamentParticipantForm.deleteSuccessNotification',
  },
  deleteFailureNotification: {
    id: 'app.errors.generic',
  },
});

/*
 * Sagas
 */
function* handleCreate({
  payload: {
    endpointParams,
    meta: { successCallback, failureCallback },
  },
}) {
  const action = yield take([
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAILURE,
  ]);

  if (action.type === actionTypes.CREATE_SUCCESS) {
    if (successCallback) successCallback();
    yield put(
      push(`/admin/tournaments/${endpointParams.tournamentId}/participants`),
    );
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.createSuccessNotification),
    });
  } else {
    if (failureCallback) failureCallback();

    yield call(notification.error, {
      message: intlGlobal.formatMessage(intlMessages.createFailureNotification),
    });
  }
}

function* handleDelete({
  payload: {
    meta: { successCallback, failureCallback },
  },
}) {
  const action = yield take([
    actionTypes.DELETE_SUCCESS,
    actionTypes.DELETE_FAILURE,
  ]);

  if (action.type === actionTypes.DELETE_SUCCESS) {
    if (successCallback) successCallback();

    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.deleteSuccessNotification),
    });
  } else {
    if (failureCallback) failureCallback();

    yield call(notification.error, {
      message: intlGlobal.formatMessage(intlMessages.deleteFailureNotification),
    });
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_REQUEST, handleCreate)]);
  yield all([takeLatest(actionTypes.DELETE_REQUEST, handleDelete)]);
}

export default reducers;
