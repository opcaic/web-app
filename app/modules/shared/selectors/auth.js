import { createSelector } from 'reselect';

const getAuth = state => state.get('auth');

export const jwtSelector = createSelector(getAuth, auth => auth.get('token'));
export const isLoggedIn = createSelector(jwtSelector, jwt => Boolean(jwt));
