import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import { resendConfirmationEmail } from '@/modules/public/ducks/accounts';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import ResendConfirmationEmailForm from '@/modules/public/components/Login/ResendConfirmationEmailForm';

/* eslint-disable react/prefer-stateless-function */
export class ResendConfirmationEmailPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
        <PageTitle
          title={intlGlobal.formatMessage(
            pageTitles.resendConfirmationEmailPage,
          )}
        />

        <ResendConfirmationEmailForm
          onSubmit={this.props.resendConfirmationEmail}
        />
      </NoMenuPageLayout>
    );
  }
}

ResendConfirmationEmailPage.propTypes = {
  resendConfirmationEmail: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    resendConfirmationEmail: (values, successCallback, failureCallback) =>
      dispatch(
        resendConfirmationEmail(values.email, successCallback, failureCallback),
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
)(ResendConfirmationEmailPage);
