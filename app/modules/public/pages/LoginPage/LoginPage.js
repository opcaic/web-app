import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import { login } from '../../../shared/ducks/auth';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
        <LoginForm
          onSubmit={(values, successCallback, failureCallback) =>
            this.props.login(values, successCallback, failureCallback)
          }
        />
      </NoMenuPageLayout>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    login: (values, successCallback, failureCallback) =>
      dispatch(
        login(values.email, values.password, successCallback, failureCallback),
      ),
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(LoginPage);
