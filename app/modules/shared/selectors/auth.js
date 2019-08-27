import { createSelector } from 'reselect';

const getAuth = state => state.get('auth');

export const currentUserSelector = createSelector(
  getAuth,
  auth => auth && auth.toJS(),
);

export const accessTokenSelector = createSelector(getAuth, auth =>
  auth.get('accessToken'),
);
export const refreshTokenSelector = createSelector(getAuth, auth =>
  auth.get('refreshToken'),
);
export const isLoggedIn = createSelector(accessTokenSelector, jwt =>
  Boolean(jwt),
);
export const initialLoadCompleted = createSelector(getAuth, auth =>
  auth.get('initialLoadCompleted'),
);
export const roleSelector = createSelector(getAuth, auth => auth.get('role'));
