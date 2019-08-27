import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { roleSelector } from '@/modules/shared/selectors/auth';
import ForbiddenPage from '@/modules/admin/pages/ForbiddenPage';

const AuthorizedRoute = ({
  component: Component,
  requiredRole,
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      role >= requiredRole ? <Component {...props} /> : <ForbiddenPage />
    }
  />
);

const mapStateToProps = createStructuredSelector({
  role: roleSelector,
});

export default connect(mapStateToProps)(AuthorizedRoute);
