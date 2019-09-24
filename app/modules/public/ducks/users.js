import { defineMessages } from 'react-intl';
import { notification } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { call, takeLatest, all, put } from 'redux-saga/effects';
import resourceFactory from '../../shared/helpers/resourceManager';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import { accountErrorMessageProvider } from '@/modules/public/helpers/accountHelpers';
import { updateTokens } from '@/modules/shared/ducks/auth';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  endpoint: 'api/users',
  resourceName: 'users',
});

const intlMessages = defineMessages({
  updateProfileNotification: {
    id: 'app.public.users.updateProfileNotification',
  },
  changePasswordNotification: {
    id: 'app.public.users.changePasswordNotification',
  },
});

/*
 * Action types
 */
export const additionalActionTypes = {
  CHANGE_PASSWORD: 'app/public/users/CHANGE_PASSWORD',
  CHANGE_PASSWORD_REQUEST: 'app/public/users/CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS: 'app/public/users/CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE: 'app/public/users/CHANGE_PASSWORD_FAILURE',
};

/*
 * Action creators
 */
export function changePassword(
  oldPassword,
  newPassword,
  successCallback,
  failureCallback,
) {
  return {
    type: additionalActionTypes.CHANGE_PASSWORD,
    payload: {
      oldPassword,
      newPassword,
      successCallback,
      failureCallback,
    },
  };
}

/*
 * Sagas
 */
function* handleUpdateProfileSuccess() {
  yield call(notification.success, {
    message: intlGlobal.formatMessage(intlMessages.updateProfileNotification),
  });
}

function* handleChangePassword({
  payload: { oldPassword, newPassword, successCallback, failureCallback },
}) {
  yield put({
    type: additionalActionTypes.CHANGE_PASSWORD_REQUEST,
  });

  const { data, status } = yield call(callApi, {
    endpoint: 'api/users/password',
    method: 'POST',
    data: {
      oldPassword,
      newPassword,
    },
  });

  if (status >= 200 && status < 300) {
    yield put({
      type: additionalActionTypes.CHANGE_PASSWORD_SUCCESS,
    });

    if (successCallback) {
      successCallback();
    }

    yield put(updateTokens(data.accessToken, data.refreshToken));
    yield call(notification.success, {
      message: intlGlobal.formatMessage(
        intlMessages.changePasswordNotification,
      ),
    });
  } else {
    yield put({
      type: additionalActionTypes.CHANGE_PASSWORD_FAILURE,
    });

    if (failureCallback) {
      const errors = prepareFormErrors(data, accountErrorMessageProvider);
      failureCallback(errors);
    }
  }
}

export function* saga() {
  yield all([
    takeLatest(actionTypes.UPDATE_SUCCESS, handleUpdateProfileSuccess),
    takeLatest(additionalActionTypes.CHANGE_PASSWORD, handleChangePassword),
  ]);
}

export default reducers;
