import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../../components/Login/RegisterForm';
import { register } from '../../../shared/ducks/registration';
import { makeSelectRegistrationErrors } from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class RegisterPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <div style={{ margin: 'auto' }}>
          <RegisterForm
            onSubmit={(values, errorsCallback) =>
              this.props.register(values, errorsCallback)
            }
          />
        </div>
      </PageLayout>
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    register: (values, errorsCallback) =>
      dispatch(register(values.username, values.email, errorsCallback)),
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
