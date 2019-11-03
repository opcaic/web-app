import resourceFactory from '@/modules/shared/helpers/resourceManager';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { put, call, takeEvery, all } from 'redux-saga/effects';
import { notification } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { defineMessages } from 'react-intl';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/broker/items',
  resourceName: 'systemItems',
});

const additionalActionTypes = {
  prioritize: {
    REQUEST: 'app/admin/systemItem/PRIORITIZE_REQUEST',
    SUCCESS: 'app/admin/systemItem/PRIORITIZE_SUCCESS',
    FAILURE: 'app/admin/systemItem/PRIORITIZE_FAILURE',
  },
  cancel: {
    REQUEST: 'app/admin/systemItem/CANCEL_REQUEST',
    SUCCESS: 'app/admin/systemItem/CANCEL_SUCCESS',
    FAILURE: 'app/admin/systemItem/CANCEL_FAILURE',
  },
};

const intlMessages = defineMessages({
  prioritizeSuccessNotification: {
    id: 'app.admin.systemItems.prioritizeSuccessNotification',
  },
  prioritizeFailureNotification: {
    id: 'app.admin.systemItems.prioritizeFailureNotification',
  },
  cancelSuccessNotification: {
    id: 'app.admin.systemItems.cancelSuccessNotification',
  },
  cancelFailureNotification: {
    id: 'app.admin.systemItems.cancelFailureNotification',
  },
});

export function prioritizeSystemItem(itemId, successCallback, failureCallback) {
  return {
    type: additionalActionTypes.prioritize.REQUEST,
    payload: {
      itemId,
      successCallback,
      failureCallback,
    },
  };
}

export function cancelSystemItem(itemId, successCallback, failureCallback) {
  return {
    type: additionalActionTypes.cancel.REQUEST,
    payload: {
      itemId,
      successCallback,
      failureCallback,
    },
  };
}

function createHandler(actionName) {
  const actionsByName = additionalActionTypes[actionName];

  function* handleTournamentAction({
    payload: { itemId, successCallback, failureCallback },
  }) {
    try {
      const endpointName =
        actionName === 'prioritize' ? 'priority' : 'cancellation';

      const { status } = yield call(callApi, {
        endpoint: `api/broker/${endpointName}?id=${itemId}`,
        method: 'POST',
      });

      if (status >= 200 && status < 300) {
        yield put({
          type: actionsByName.SUCCESS,
        });
        yield call(notification.success, {
          message: intlGlobal.formatMessage(
            actionName === 'prioritize'
              ? intlMessages.prioritizeSuccessNotification
              : intlMessages.cancelSuccessNotification,
          ),
        });

        if (successCallback) successCallback();
      } else {
        yield put({
          type: actionsByName.FAILURE,
        });
        yield call(notification.error, {
          message: intlGlobal.formatMessage(
            actionName === 'prioritize'
              ? intlMessages.prioritizeFailureNotification
              : intlMessages.cancelFailureNotification,
          ),
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
  yield all([
    takeEvery(
      additionalActionTypes.prioritize.REQUEST,
      createHandler('prioritize'),
    ),
  ]);
  yield all([
    takeEvery(additionalActionTypes.cancel.REQUEST, createHandler('cancel')),
  ]);
}

export default reducers;
