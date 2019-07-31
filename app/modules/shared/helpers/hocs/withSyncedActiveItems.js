import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeActiveMenuItemsSelector } from '@/modules/shared/selectors/ui';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

/**
 * Higher order component that provides activeItems props that contain
 * active items for a given menu from the Redux store.
 *
 * @param WrappedComponent
 * @param menuName
 */
function withSyncedActiveItems(WrappedComponent, menuName) {
  const HocComponent = props => <WrappedComponent {...props} />;

  const mapStateToProps = createStructuredSelector({
    activeItems: makeActiveMenuItemsSelector(menuName),
  });

  const withConnect = connect(mapStateToProps);

  return compose(
    withRouter,
    withConnect,
  )(HocComponent);
}

export default withSyncedActiveItems;
