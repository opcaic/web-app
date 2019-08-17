import { all, takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import { defineMessages } from 'react-intl';
import resourceFactory from '../../shared/helpers/resourceManager';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/games',
  resourceName: 'games',
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.games.createSuccessNotification',
  },
  updateSuccessNotification: {
    id: 'app.admin.games.updateSuccessNotification',
  },
});

/*
 * Sagas
 */
function* handleCreateSuccess(action) {
  yield put(push(`/admin/games/${action.payload.id}`));
  yield call(notification.success, {
    message: intl.formatMessage(intlMessages.createSuccessNotification),
  });
}

function* handleUpdateSuccess() {
  yield call(notification.success, {
    message: intl.formatMessage(intlMessages.updateSuccessNotification),
  });
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_SUCCESS, handleCreateSuccess)]);
  yield all([takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateSuccess)]);
}

export default reducers;
