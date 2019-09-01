import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import { resetPassword } from '@/modules/public/ducks/accounts';
import ResetPasswordForm from '@/modules/public/components/Login/ResetPasswordForm';
import * as qs from 'query-string';

/* eslint-disable react/prefer-stateless-function */
export class ResetPasswordPage extends React.PureComponent {
  render() {
    const queryParams = qs.parse(this.props.location.search);

    return (
      <NoMenuPageLayout size="small">
        <ResetPasswordForm
          onSubmit={(values, successCallback, failureCallback) =>
            this.props.resetPassword(
              values,
              queryParams.email,
              queryParams.token,
              successCallback,
              failureCallback,
            )
          }
        />
      </NoMenuPageLayout>
    );
  }
}

ResetPasswordPage.propTypes = {
  resetPassword: PropTypes.func,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (
      values,
      email,
      resetToken,
      successCallback,
      failureCallback,
    ) =>
      dispatch(
        resetPassword(
          email,
          resetToken,
          values.password,
          successCallback,
          failureCallback,
        ),
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
)(ResetPasswordPage);
