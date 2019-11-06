import { all, takeLatest, take, call } from 'redux-saga/effects';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  resourceName: 'tournamentManagers',
  apiEndpointFactory: (email = '', endpointParams) =>
    `api/tournaments/${endpointParams.tournamentId}/managers/${email}`,
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.tournamentManagers.createSuccessNotification',
  },
  createFailureNotification: {
    id: 'app.errors.generic',
  },
  deleteSuccessNotification: {
    id: 'app.admin.tournamentManagers.deleteSuccessNotification',
  },
  deleteFailureNotification: {
    id: 'app.errors.generic',
  },
});

/*
 * Sagas
 */
function* handleCreate() {
  const action = yield take([
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAILURE,
  ]);

  if (action.type === actionTypes.CREATE_SUCCESS) {
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.createSuccessNotification),
    });
  } else {
    yield call(notification.error, {
      message: intlGlobal.formatMessage(intlMessages.createFailureNotification),
    });
  }
}

function* handleDelete() {
  const action = yield take([
    actionTypes.DELETE_SUCCESS,
    actionTypes.DELETE_FAILURE,
  ]);

  if (action.type === actionTypes.DELETE_SUCCESS) {
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.deleteSuccessNotification),
    });
  } else {
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
