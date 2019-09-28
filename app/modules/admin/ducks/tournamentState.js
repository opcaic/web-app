import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { put, call, takeEvery, all } from 'redux-saga/effects';

export const actionTypes = {
  publish: {
    REQUEST: 'app/admin/tournament/PUBLISH_REQUEST',
    SUCCESS: 'app/admin/tournament/PUBLISH_SUCCESS',
    FAILURE: 'app/admin/tournament/PUBLISH_FAILURE',
  },
  start: {
    REQUEST: 'app/admin/tournament/START_REQUEST',
    SUCCESS: 'app/admin/tournament/START_SUCCESS',
    FAILURE: 'app/admin/tournament/START_FAILURE',
  },
  pause: {
    REQUEST: 'app/admin/tournament/PAUSE_REQUEST',
    SUCCESS: 'app/admin/tournament/PAUSE_SUCCESS',
    FAILURE: 'app/admin/tournament/PAUSE_FAILURE',
  },
  unpause: {
    REQUEST: 'app/admin/tournament/UNPAUSE_REQUEST',
    SUCCESS: 'app/admin/tournament/UNPAUSE_SUCCESS',
    FAILURE: 'app/admin/tournament/UNPAUSE_FAILURE',
  },
  stop: {
    REQUEST: 'app/admin/tournament/STOP_REQUEST',
    SUCCESS: 'app/admin/tournament/STOP_SUCCESS',
    FAILURE: 'app/admin/tournament/STOP_FAILURE',
  },
};

export function publishTournament(
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.publish.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function startTournament(
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.start.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function pauseTournament(
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.pause.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function unpauseTournament(
  tournamentId,
  successCallback,
  failureCallback,
) {
  return {
    type: actionTypes.unpause.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

export function stopTournament(tournamentId, successCallback, failureCallback) {
  return {
    type: actionTypes.stop.REQUEST,
    payload: {
      tournamentId,
      successCallback,
      failureCallback,
    },
  };
}

function createHandler(actionName) {
  const actions = actionTypes[actionName];

  console.log('createHadnler');

  function* handleTournamentAction({
    payload: { tournamentId, successCallback, failureCallback },
  }) {
    console.log('handling');

    try {
      const { status } = yield call(callApi, {
        endpoint: `api/tournaments/${tournamentId}/${actionName}`,
        method: 'POST',
      });

      if (status >= 200 && status < 300) {
        yield put({
          type: actions.SUCCESS,
        });
        if (successCallback) successCallback();
      } else {
        yield put({
          type: actions.FAILURE,
        });

        if (failureCallback) failureCallback();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return handleTournamentAction;
}

export function* saga() {
  yield all([takeEvery(actionTypes.publish.REQUEST, createHandler('publish'))]);
  yield all([takeEvery(actionTypes.start.REQUEST, createHandler('start'))]);
  yield all([takeEvery(actionTypes.pause.REQUEST, createHandler('pause'))]);
  yield all([takeEvery(actionTypes.unpause.REQUEST, createHandler('unpause'))]);
  yield all([takeEvery(actionTypes.stop.REQUEST, createHandler('stop'))]);
}
