/* eslint-disable no-restricted-globals */
import { put, takeEvery, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import { Button, notification } from 'antd';
import React from 'react';
import {
  isLoggedIn as isLoggedInSelector,
  accessTokenSelector,
} from '../selectors/auth';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export const API_BASE = process.env.API_URL;
export const CALL_API = 'app/CALL_API';
const axiosInstance = axios.create();

export const createApiAction = (request, meta) => ({
  type: CALL_API,
  request,
  meta,
});

function prepareAxiosParams({ method, endpoint, ...rest }) {
  return {
    method,
    url: API_BASE + endpoint,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {},
    validateStatus(status) {
      return status >= 200 && status < 500;
    },
    ...rest,
  };
}

export function* callApi(request) {
  const requestParams = prepareAxiosParams(request);

  const isLoggedIn = yield select(isLoggedInSelector);

  if (isLoggedIn) {
    const accessToken = yield select(accessTokenSelector);
    requestParams.headers.Authorization = `Bearer ${accessToken}`;
  }

  return yield call(axiosInstance.request, requestParams);
}

function* handleApiCalls({ request, meta = {} }) {
  const { type } = request;

  yield put({
    type: `${type}_REQUEST`,
    payload: request,
  });

  const response = yield call(callApi, request);
  const { data, status } = response;

  if (status < 400) {
    yield put({
      type: `${type}_SUCCESS`,
      payload: data,
    });

    if (meta.successCallback) {
      meta.successCallback(data);
    }
  } else {
    yield put({
      type: `${type}_FAILURE`,
    });

    const errors = prepareFormErrors(data);

    if (meta.failureCallback) {
      meta.failureCallback(errors);
    }
  }
}

const notAuthenticatedNotificationMessages = defineMessages({
  reload: { id: 'app.shared.notAuthenticatedNotification.reload' },
  title: { id: 'app.shared.notAuthenticatedNotification.title' },
  description: { id: 'app.shared.notAuthenticatedNotification.description' },
});

function* handle401Interceptor() {
  axiosInstance.interceptors.response.use(response => {
    if (response.status === 401) {
      const key = `notAuthenticatedNotification`;
      const btn = (
        <Button type="primary" onClick={() => location.reload()}>
          {intlGlobal.formatMessage(
            notAuthenticatedNotificationMessages.reload,
          )}
        </Button>
      );
      notification.error({
        message: intlGlobal.formatMessage(
          notAuthenticatedNotificationMessages.title,
        ),
        description: intlGlobal.formatMessage(
          notAuthenticatedNotificationMessages.description,
        ),
        btn,
        key,
      });
    }

    return response;
  });
}

export function* apiSaga() {
  yield all([call(handle401Interceptor), takeEvery(CALL_API, handleApiCalls)]);
}
