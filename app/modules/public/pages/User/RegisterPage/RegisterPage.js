import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../../../components/Login/RegisterForm';
import { register } from '../../../ducks/registration';
import { makeSelectRegistrationErrors } from './selectors';
import NoMenuPageLayout from '@/modules/public/components/layout/NoMenuPageLayout';

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  render() {
    return (
      <NoMenuPageLayout size="small">
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

const mapStateToProps = createStructuredSelector({
  errors: makeSelectRegistrationErrors(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(RegisterPage);
