import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../../../components/Login/RegisterForm';
import { register } from '../../../ducks/registration';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';
import PageTitle from '@/modules/shared/components/PageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
        <PageTitle title={intlGlobal.formatMessage(pageTitles.registerPage)} />

        <RegisterForm
          onSubmit={(values, successCallback, failureCallback) =>
            this.props.register(values, successCallback, failureCallback)
          }
        />
      </NoMenuPageLayout>
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    register: (values, successCallback, failureCallback) =>
      dispatch(
        register(
          values.username,
          values.email,
          values.password,
          successCallback,
          failureCallback,
        ),
      ),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(RegisterPage);
