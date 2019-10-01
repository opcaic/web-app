/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';

import history from 'utils/history';
// import languageProviderReducer from 'modules/public/containers/LanguageProvider/reducer';

export const resetStateActionType = 'app/RESET_STATE';
export function resetState() {
  return {
    type: resetStateActionType,
  };
}

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const appReducer = combineReducers({
    ...injectedReducers,
  });

  const rootReducer = (state, action) => {
    if (action.type === resetStateActionType) {
      // eslint-disable-next-line no-param-reassign
      state = undefined;
    }

    return appReducer(state, action);
  };

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
