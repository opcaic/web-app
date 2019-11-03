import { all, take, takeLatest, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import { defineMessages } from 'react-intl';
import resourceFactory from '../../shared/helpers/resourceManager';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/games',
  resourceName: 'games',
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.games.createSuccessNotification',
  },
  createFailureNotification: {
    id: 'app.admin.games.createFailureNotification',
  },
  updateSuccessNotification: {
    id: 'app.admin.games.updateSuccessNotification',
  },
  updateFailureNotification: {
    id: 'app.admin.games.updateFailureNotification',
  },
});

/*
 * Sagas
 */
function* handleCreate({ payload }) {
  const action = yield take([
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAILURE,
  ]);

  if (action.type === actionTypes.CREATE_SUCCESS) {
    yield put(push(`/admin/games/${payload.id}`));
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.createSuccessNotification),
    });
  } else {
    yield call(notification.error, {
      message: intlGlobal.formatMessage(intlMessages.createFailureNotification),
    });
  }
}

function* handleUpdate() {
  const action = yield take([
    actionTypes.UPDATE_SUCCESS,
    actionTypes.UPDATE_FAILURE,
  ]);

  if (action.type === actionTypes.UPDATE_SUCCESS) {
    yield call(notification.success, {
      message: intlGlobal.formatMessage(intlMessages.updateSuccessNotification),
    });
  } else {
    yield call(notification.error, {
      message: intlGlobal.formatMessage(intlMessages.updateFailureNotification),
    });
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_REQUEST, handleCreate)]);
  yield all([takeLatest(actionTypes.UPDATE_REQUEST, handleUpdate)]);
}

export default reducers;
