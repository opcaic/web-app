import { all, takeLatest, take, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';
import { defineMessages } from 'react-intl';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/documents',
  resourceName: 'documents',
});

const intlMessages = defineMessages({
  createSuccessNotification: {
    id: 'app.admin.documents.createSuccessNotification',
  },
  updateSuccessNotification: {
    id: 'app.admin.documents.updateSuccessNotification',
  },
});

/*
 * Sagas
 */
function* handleCreate({ payload: { data } }) {
  const action = yield take([
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAILURE,
  ]);

  if (action.type === actionTypes.CREATE_SUCCESS) {
    yield put(
      push(
        `/admin/tournaments/${data.tournamentId}/documents/${
          action.payload.id
        }`,
      ),
    );
    yield call(notification.success, {
      message: intl.formatMessage(intlMessages.createSuccessNotification),
    });
  }
}

function* handleUpdateSuccess() {
  yield call(notification.success, {
    message: intl.formatMessage(intlMessages.updateSuccessNotification),
  });
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_REQUEST, handleCreate)]);
  yield all([takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateSuccess)]);
}

export default reducers;
