import React from 'react';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Result } from 'antd';
import PropTypes from 'prop-types';
import * as qs from 'query-string';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Spin from '@/modules/shared/components/Spin';
import { confirmEmail } from '@/modules/public/ducks/registration';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class ConfirmEmailPage extends React.PureComponent {
  state = {
    hasResult: false,
    success: false,
  };

  componentDidMount() {
    const queryParams = qs.parse(this.props.location.search);

    this.props.confirmEmail(
      queryParams.email,
      queryParams.token,
      this.successCallback,
      this.failureCallback,
    );
  }

  successCallback = () => {
    this.setState({ hasResult: true, success: true });
  };

  failureCallback = () => {
    this.setState({ hasResult: true, success: false });
  };

  render() {
    if (this.state.hasResult === false) {
      return (
        <NoMenuPageLayout size="medium" style={{ textAlign: 'center' }}>
          <Spin spinning />
        </NoMenuPageLayout>
      );
    }

    return (
      <NoMenuPageLayout size="medium">
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.confirmEmailPage)}
        />

        {this.state.success ? (
          <Result
            status="success"
            title={
              <FormattedMessage id="app.public.confirmEmail.successTitle" />
            }
            subTitle={
              <FormattedHTMLMessage id="app.public.confirmEmail.successText" />
            }
            extra={[
              <Button type="primary" key="console">
                <Link to="/login">
                  <FormattedMessage id="app.public.confirmEmail.login" />
                </Link>
              </Button>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title={
              <FormattedMessage id="app.public.confirmEmail.failureTitle" />
            }
            subTitle={
              <FormattedHTMLMessage id="app.public.confirmEmail.failureText" />
            }
            extra={[
              <Button type="primary" key="console">
                <Link to="/">
                  <FormattedMessage id="app.public.confirmEmail.backToHomepage" />
                </Link>
              </Button>,
            ]}
          />
        )}
      </NoMenuPageLayout>
    );
  }
}

ConfirmEmailPage.propTypes = {
  confirmEmail: PropTypes.func,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    confirmEmail: (email, token, successCallback, failureCallback) =>
      dispatch(confirmEmail(email, token, successCallback, failureCallback)),
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
)(ConfirmEmailPage);
