import resourceFactory from '@/modules/shared/helpers/resourceManager/resourceFactory';
import { all, takeLatest, call } from 'redux-saga/effects';
import { notification } from 'antd';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

const createRoute = endpointParams =>
  endpointParams.name && endpointParams.languageCode
    ? `/${endpointParams.name}/${endpointParams.languageCode}`
    : '';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  resourceName: 'emailTemplates',
  // eslint-disable-next-line react/no-unused-vars
  apiEndpointFactory: (id, endpointParams = {}) =>
    `api/emails/templates${createRoute(endpointParams)}`,
});

const intlMessages = defineMessages({
  updateSuccessNotification: {
    id: 'app.admin.emailTemplates.updateSuccessNotification',
  },
  updateFailureNotification: {
    id: 'app.admin.emailTemplates.updateFailureNotification',
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
