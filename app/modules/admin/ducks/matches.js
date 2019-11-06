import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { notification } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { defineMessages } from 'react-intl';
import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/matches',
  resourceName: 'matches',
});

const additionalActionTypes = {
  rematch: {
    REQUEST: 'app/admin/matches/REMATCH_REQUEST',
    SUCCESS: 'app/admin/matches/REMATCH_SUCCESS',
    FAILURE: 'app/admin/matches/REMATCH_FAILURE',
  },
};

const intlMessages = defineMessages({
  rematchSuccessNotification: {
    id: 'app.admin.matches.rematchSuccessNotification',
  },
  rematchFailureNotification: {
    id: 'app.admin.matches.rematchFailureNotification',
  },
});

export function createMatchExecution(
  matchId,
  successCallback,
  failureCallback,
) {
  return {
    type: additionalActionTypes.rematch.REQUEST,
    payload: {
      matchId,
      successCallback,
      failureCallback,
    },
  };
}

function* handleRematchRequest({
  payload: { matchId, successCallback, failureCallback },
}) {
  try {
    const { status } = yield call(callApi, {
      endpoint: `api/matches/${matchId}/execute`,
      method: 'POST',
    });

    if (status >= 200 && status < 300) {
      yield put({
        type: additionalActionTypes.rematch.SUCCESS,
      });
      yield call(notification.success, {
        message: intlGlobal.formatMessage(
          intlMessages.rematchSuccessNotification,
        ),
      });

      if (successCallback) successCallback();
    } else {
      yield put({
        type: additionalActionTypes.rematch.FAILURE,
      });
      yield call(notification.error, {
        message: intlGlobal.formatMessage(
          intlMessages.rematchFailureNotification,
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
    takeEvery(additionalActionTypes.rematch.REQUEST, handleRematchRequest),
  ]);
}

export default reducers;
