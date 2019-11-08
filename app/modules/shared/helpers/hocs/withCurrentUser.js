import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { currentUserSelector } from '@/modules/shared/selectors/auth';

/**
 * Higher order component that provides currentUser prop that contains
 * the currently logged user or null if not logged in
 *
 * @param WrappedComponent
 */
function withCurrentUser(WrappedComponent) {
  const HocComponent = props => <WrappedComponent {...props} />;

  const mapStateToProps = createStructuredSelector({
    currentUser: currentUserSelector,
  });

  const withConnect = connect(mapStateToProps);

  return compose(
    withRouter,
    withConnect,
  )(HocComponent);
}

export default withCurrentUser;
