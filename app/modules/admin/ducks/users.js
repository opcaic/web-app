import resourceFactory from '@/modules/shared/helpers/resourceManager';
import { all, takeLatest, call } from 'redux-saga/effects';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { notification } from 'antd';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/users',
  resourceName: 'users',
});

const intlMessages = defineMessages({
  updateSuccessNotification: {
    id: 'app.admin.users.updateSuccessNotification',
  },
  updateFailureNotification: {
    id: 'app.admin.users.updateFailureNotification',
  },
});

/*
 * Sagas
 */

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

export function* saga() {
  yield all([takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateSuccess)]);
  yield all([takeLatest(actionTypes.UPDATE_FAILURE, handleUpdateFailure)]);
}

export default reducers;
