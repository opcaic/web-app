import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { isLoggedIn } from '@/modules/shared/selectors/auth';

const PrivateRoute = ({ component: Component, isLoggedInValue, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedInValue ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const mapStateToProps = createStructuredSelector({
  isLoggedInValue: isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
