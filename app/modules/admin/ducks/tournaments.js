import { all, takeLatest, take, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/tournaments',
  resourceName: 'tournaments',
});

/*
 * Sagas
 */
function* handleCreate() {
  const action = yield take([
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAILURE,
  ]);

  if (action.type === actionTypes.CREATE_SUCCESS) {
    yield put(push(`/admin/tournaments/${action.payload.id}`));
    yield call(notification.success, {
      message: 'Tournament successfully created', // TODO: needs to be translated
    });
  } else {
    // TODO: handle failure
  }
}

export function* saga() {
  yield all([takeLatest(actionTypes.CREATE_REQUEST, handleCreate)]);
}

export default reducers;
