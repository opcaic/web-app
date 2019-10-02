import { fromJS } from 'immutable';
import { takeEvery, all, call, put, select } from 'redux-saga/effects'; // eslint-disable-line
import Cookies from 'js-cookie';
import { DEFAULT_LOCALE } from '../../../i18n';
import { resetStateActionType } from '@/reducers';
import { isLoggedIn } from '@/modules/shared/selectors/auth';
import { callApi } from '@/modules/shared/helpers/apiMiddleware';

/*
 * Action types
 */
export const actionTypes = {
  CHANGE_LOCALE: 'app/shared/localization/CHANGE_LOCALE',
};

/*
 * Action creators
 */
export function changeLocale(languageLocale, updateUser = false) {
  return {
    type: actionTypes.CHANGE_LOCALE,
    payload: languageLocale,
    meta: { updateUser },
  };
}

const localeCookieName = 'locale';

/*
 * Sagas
 */
function* handleLoadLocale() {
  const locale = Cookies.get(localeCookieName);

  if (locale) {
    yield put(changeLocale(locale));
  }
}

function* handleChangeLocale({ payload, meta: { updateUser } }) {
  Cookies.set(localeCookieName, payload, { expires: 60 });
  const isLoggedInValue = yield select(isLoggedIn);

  if (updateUser && isLoggedInValue) {
    yield call(callApi, {
      endpoint: `api/users/language/${payload}`,
      method: 'POST',
      data: {},
    });
  }
}

export function* saga() {
  yield all([
    takeEvery(resetStateActionType, handleLoadLocale),
    takeEvery(actionTypes.CHANGE_LOCALE, handleChangeLocale),
  ]);
}

/*
 * Reducers
 */
export const initialState = fromJS({
  locale: Cookies.get(localeCookieName) || DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LOCALE:
      return state.set('locale', action.payload);
    default:
      return state;
  }
}

export default languageProviderReducer;
