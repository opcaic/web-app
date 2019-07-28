import { createSelector } from 'reselect';

const getUI = state => state.get('ui');
const getMenus = createSelector(getUI, ui => ui.get('menu'));

export const makeActiveMenuItemsSelector = menuName =>
  createSelector(getMenus, menus => {
    const activeItems = menus.get(menuName);

    if (activeItems) {
      return activeItems.toJS();
    }

    return activeItems;
  });
