import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import { login } from '../../../shared/ducks/auth';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <div style={{ margin: 'auto' }}>
          <LoginForm
            onSubmit={(values, errorsCallback) =>
              this.props.login(values, errorsCallback)
            }
          />
        </div>
      </PageLayout>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    login: (values, errorsCallback) =>
      dispatch(login(values.email, values.password, errorsCallback)),
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
