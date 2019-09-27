import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import { changePassword } from '@/modules/public/ducks/users';
import { withRouter } from 'react-router-dom';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import ChangePasswordForm from '@/modules/public/components/Account/ChangePasswordForm';

/* eslint-disable react/prefer-stateless-function */
class ChangePasswordPage extends React.PureComponent {
  onSubmit = (values, successCallback, failureCallback) => {
    this.props.updateResource(values, successCallback, failureCallback);
  };

  render() {
    return (
      <div>
        <Typography.Title level={3}>
          {intlGlobal.formatMessage(pageTitles.changePasswordPage)}
        </Typography.Title>
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.changePasswordPage)}
        />

        <ChangePasswordForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

ChangePasswordPage.propTypes = {
  updateResource: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    updateResource: (values, successCallback, failureCallback) =>
      dispatch(
        changePassword(
          values.oldPassword,
          values.newPassword,
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
)(ChangePasswordPage);
