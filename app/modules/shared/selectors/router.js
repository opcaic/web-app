import { createSelector } from 'reselect';

const getRouter = state => state.get('router');
const getLocation = createSelector(getRouter, router => router.get('location'));

export const routerStateSelector = createSelector(getLocation, router => {
  const state = router.get('state');

  if (state) {
    return state.toJS();
  }

  return state;
});
