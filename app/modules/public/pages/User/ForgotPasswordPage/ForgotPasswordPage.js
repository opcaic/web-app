import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import ForgotPasswordForm from '@/modules/public/components/Login/ForgotPasswordForm';
import { forgotPassword } from '@/modules/public/ducks/accounts';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class ForgotPasswordPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.forgotPasswordPage)}
        />

        <ForgotPasswordForm
          onSubmit={(values, successCallback, failureCallback) =>
            this.props.forgotPassword(values, successCallback, failureCallback)
          }
        />
      </NoMenuPageLayout>
    );
  }
}

ForgotPasswordPage.propTypes = {
  forgotPassword: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (values, successCallback, failureCallback) =>
      dispatch(forgotPassword(values.email, successCallback, failureCallback)),
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
)(ForgotPasswordPage);
