import { all, takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.tournaments.createSuccessNotification',
  },
  updateSuccessNotification: {
    id: 'app.admin.tournaments.updateSuccessNotification',
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

function* handleUpdateSuccess() {
  yield call(notification.success, {
    message: intlGlobal.formatMessage(intlMessages.updateSuccessNotification),
  });
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_SUCCESS, handleCreateSuccess)]);
  yield all([takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateSuccess)]);
}

export default reducers;
