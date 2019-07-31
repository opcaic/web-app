import React from 'react';
import { connect } from 'react-redux';
import { syncMenu } from '@/modules/shared/ducks/ui';

/**
 * Higher order component that is used to dispatch a menu sync action on componentWillMount().
 *
 * Basic usage:
 * Wrap a component that should be displayed in a Route:
 *  <Route
 *    exact
 *    path="/admin/"
 *    component={withMenuSync(DashboardPage, {
 *      adminSidebar: ['dashboard'],
 *    })}
 *  />
 *
 * This will cause that every time this route is visited an action is dispatched that informs
 * the redux store which menu items should be active.
 *
 * @param WrappedComponent
 * @param activeMenus - which menu items should be activated
 * shape: {
 *  menuName1: ['activeItemKey1'],
 *  menuName2: ['activeItemKey1', 'activeItemKey2'],
 * }
 */
function withMenuSync(WrappedComponent, activeMenus) {
  class HocComponent extends React.Component {
    componentWillMount() {
      if (activeMenus) {
        Object.keys(activeMenus).forEach(key => {
          this.props.syncMenu(key, activeMenus[key]);
        });
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  function mapDispatchToProps(dispatch) {
    return {
      syncMenu: (menuName, activeItems) =>
        dispatch(syncMenu(menuName, activeItems)),
    };
  }

  return connect(
    null,
    mapDispatchToProps,
  )(HocComponent);
}

export default withMenuSync;
