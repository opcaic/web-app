import { fromJS } from 'immutable';
import { DEFAULT_LOCALE } from '../../../i18n'; // eslint-disable-line

/*
 * Action types
 */
export const actionTypes = {
  CHANGE_LOCALE: 'app/shared/localization/CHANGE_LOCALE',
};

/*
 * Action creators
 */
export function changeLocale(languageLocale) {
  return {
    type: actionTypes.CHANGE_LOCALE,
    locale: languageLocale,
  };
}

/*
 * Reducers
 */
export const initialState = fromJS({
  locale: DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
