import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <div style={{ margin: 'auto' }}>
          <LoginForm />
        </div>
      </PageLayout>
    );
  }
}

LoginPage.propTypes = {};

export function mapDispatchToProps() {
  return {};
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
