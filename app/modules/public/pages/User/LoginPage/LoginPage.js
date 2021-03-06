import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../../components/Login/LoginForm';
import { login } from '../../../../shared/ducks/auth';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
        <PageTitle title={intlGlobal.formatMessage(pageTitles.loginPage)} />

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
        login(
          values.email,
          values.password,
          values.rememberMe,
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
)(LoginPage);
