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

const cloneActionTypes = {
  REQUEST: 'app/admin/tournament/CLONE_REQUEST',
  SUCCESS: 'app/admin/tournament/CLONE_SUCCESS',
  FAILURE: 'app/admin/tournament/CLONE_FAILURE',
};

export function cloneTournament(id, successCallback, failureCallback) {
  return {
    type: cloneActionTypes.REQUEST,
    payload: {
      tournamentId: id,
      successCallback,
      failureCallback,
    },
  };
}

const intlMessages = defineMessages({
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
        type: cloneActionTypes.SUCCESS,
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
        type: cloneActionTypes.FAILURE,
      });
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.changeFailureNotification,
        ),
      });

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
  yield all([takeLatest(cloneActionTypes.REQUEST, handleTournamentClone)]);
}

export default reducers;
