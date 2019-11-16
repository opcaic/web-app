/* eslint-disable no-restricted-globals */
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { prepareFormErrors } from '@/modules/shared/helpers/errors/errors';
import { Button, notification } from 'antd';
import React from 'react';
import * as qs from 'query-string';
import {
  accessTokenSelector,
  isLoggedIn as isLoggedInSelector,
} from '../selectors/auth';
import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { settings } from '@/modules/shared/helpers/utils';

export const API_BASE = settings.apiUrl;
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
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
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

  try {
    return yield call(axiosInstance.request, requestParams);
  } catch (e) {
    yield call(showGenericErrorNotification);
    throw e;
  }
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
      payload: {
        status,
      },
    });

    const errors = prepareFormErrors(data);

    if (meta.failureCallback) {
      meta.failureCallback(errors);
    }
  }
}

const genericErrorNotificationMessages = defineMessages({
  title: { id: 'app.shared.genericErrorNotification.title' },
  description: { id: 'app.shared.genericErrorNotification.description' },
});

function* showGenericErrorNotification() {
  const key = `genericErrorNotification`;
  notification.error({
    message: intlGlobal.formatMessage(genericErrorNotificationMessages.title),
    description: intlGlobal.formatMessage(
      genericErrorNotificationMessages.description,
    ),
    key,
    duration: 0,
  });
}

const notAuthenticatedNotificationMessages = defineMessages({
  reload: { id: 'app.shared.notAuthenticatedNotification.reload' },
  title: { id: 'app.shared.notAuthenticatedNotification.title' },
  description: { id: 'app.shared.notAuthenticatedNotification.description' },
});

function* handle401Interceptor() {
  axiosInstance.interceptors.response.use(response => {
    if (response.status === 401) {
      if (response.data && response.data.code === 'login-invalid') {
        return response;
      }

      if (response.data && response.data.code === 'invalid-token') {
        return response;
      }

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

function* handle429Interceptor() {
  axiosInstance.interceptors.response.use(response => {
    if (response.status === 429) {
      response.data = {
        code: 'too-many-requests',
      };
    }

    return response;
  });
}

export function* apiSaga() {
  yield all([
    call(handle401Interceptor),
    call(handle429Interceptor),
    takeEvery(CALL_API, handleApiCalls),
  ]);
}
