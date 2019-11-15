import { all, takeLatest, put, call } from 'redux-saga/effects';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

const additionalActionTypes = {
  clone: {
    REQUEST: 'app/admin/tournament/CLONE_REQUEST',
    SUCCESS: 'app/admin/tournament/CLONE_SUCCESS',
    FAILURE: 'app/admin/tournament/CLONE_FAILURE',
  },
  delete: {
    REQUEST: 'app/admin/tournament/DELETE_REQUEST',
    SUCCESS: 'app/admin/tournament/DELETE_SUCCESS',
    FAILURE: 'app/admin/tournament/DELETE_FAILURE',
  },
};

export function cloneTournament(id, successCallback, failureCallback) {
  return {
    type: additionalActionTypes.clone.REQUEST,
    payload: {
      tournamentId: id,
      successCallback,
      failureCallback,
    },
  };
}

export function deleteTournament(id, successCallback, failureCallback) {
  return {
    type: additionalActionTypes.delete.REQUEST,
    payload: {
      tournamentId: id,
      successCallback,
      failureCallback,
    },
  };
}

const intlMessages = defineMessages({
  forbidden: {
    id: 'app.errors.forbidden',
  },
  createSuccessNotification: {
    id: 'app.admin.tournaments.createSuccessNotification',
  },
  createFailureNotification: {
    id: 'app.admin.tournaments.createFailureNotification',
  },
  updateSuccessNotification: {
    id: 'app.admin.tournaments.updateSuccessNotification',
  },
  updateFailureNotification: {
    id: 'app.admin.tournaments.updateFailureNotification',
  },
  cloneSuccessNotification: {
    id: 'app.admin.tournaments.cloneSuccessNotification',
  },
  cloneFailureNotification: {
    id: 'app.admin.tournaments.cloneFailureNotification',
  },
  deleteSuccessNotification: {
    id: 'app.admin.tournaments.deleteSuccessNotification',
  },
  deleteFailureNotification: {
    id: 'app.admin.tournaments.deleteFailureNotification',
  },
});

/*
 * Sagas
 */
function* handleCreateSuccess(action) {
  yield put(push(`/admin/tournaments/${action.payload.id}`));
  yield call(notification.success, {
    message: intlGlobal.formatMessage(intlMessages.createSuccessNotification),
  });
}

function* handleCreateFailure() {
  yield call(notification.error, {
    message: intlGlobal.formatMessage(intlMessages.createFailureNotification),
  });
}

function* handleUpdateSuccess() {
  yield call(notification.success, {
    message: intlGlobal.formatMessage(intlMessages.updateSuccessNotification),
  });
}

function* handleUpdateFailure() {
  yield call(notification.error, {
    message: intlGlobal.formatMessage(intlMessages.updateFailureNotification),
  });
}

function* handleTournamentClone({
  payload: { tournamentId, successCallback, failureCallback },
}) {
  try {
    const { data, status } = yield call(callApi, {
      endpoint: `api/tournaments/${tournamentId}/clone`,
      method: 'POST',
    });

    if (status >= 200 && status < 300) {
      const { id } = data;

      yield put({
        type: additionalActionTypes.clone.SUCCESS,
      });
      yield put(push(`/admin/tournaments/${id}`));
      yield call(notification.success, {
        message: intlGlobal.formatMessage(
          intlMessages.cloneSuccessNotification,
        ),
      });

      if (successCallback) successCallback();
    } else {
      yield put({
        type: additionalActionTypes.clone.FAILURE,
      });
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.cloneFailureNotification,
        ),
      });

      if (failureCallback) failureCallback();
    }
  } catch (e) {
    console.log(e);
  }
}

function* handleTournamentDelete({
  payload: { tournamentId, successCallback, failureCallback },
}) {
  try {
    const { status } = yield call(callApi, {
      endpoint: `api/tournaments/${tournamentId}`,
      method: 'DELETE',
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: additionalActionTypes.delete.SUCCESS,
      });
      yield put(push('/admin/tournaments'));
      yield call(notification.success, {
        message: intlGlobal.formatMessage(
          intlMessages.deleteSuccessNotification,
        ),
      });

      if (successCallback) successCallback();
    } else {
      yield put({
        type: additionalActionTypes.delete.FAILURE,
      });

      if (status === 403) {
        yield call(notification.error, {
          message: intlMessages.formatMessage(intlMessages.forbidden),
        });
      } else {
        yield call(notification.error, {
          message: intlGlobal.formatMessage(
            intlMessages.deleteFailureNotification,
          ),
        });
      }

      if (failureCallback) failureCallback();
    }
  } catch (e) {
    console.log(e);
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_SUCCESS, handleCreateSuccess)]);
  yield all([takeLatest(actionTypes.CREATE_FAILURE, handleCreateFailure)]);
  yield all([takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateSuccess)]);
  yield all([takeLatest(actionTypes.UPDATE_FAILURE, handleUpdateFailure)]);
  yield all([
    takeLatest(additionalActionTypes.clone.REQUEST, handleTournamentClone),
  ]);
  yield all([
    takeLatest(additionalActionTypes.delete.REQUEST, handleTournamentDelete),
  ]);
}

export default reducers;
