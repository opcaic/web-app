import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as usersActions,
  selectors as usersSelectors,
} from '@/modules/public/ducks/users';
import { withRouter } from 'react-router-dom';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import ProfileForm from '@/modules/public/components/Account/ProfileForm';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import ApiResult from '@/modules/shared/components/ApiResult';

/* eslint-disable react/prefer-stateless-function */
class ProfilePage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.currentUser.id);
  }

  onSubmit = (values, successCallback, failureCallback) => {
    this.props.updateResource(
      Object.assign({}, this.props.resource, values),
      successCallback,
      failureCallback,
    );
  };

  render() {
    return (
      <div>
        <Typography.Title level={3}>
          {intlGlobal.formatMessage(pageTitles.profilePage)}
        </Typography.Title>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.profilePage)} />

        <ApiResult loading={this.props.isFetching} error={this.props.error}>
          <ProfileForm
            resource={this.props.resource || {}}
            onSubmit={this.onSubmit}
          />
        </ApiResult>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  updateResource: PropTypes.func.isRequired,
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  currentUser: PropTypes.object.isRequired,
  error: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(usersActions.fetchResource(id)),
    updateResource: (values, successCallback, failureCallback) =>
      dispatch(
        usersActions.updateResource(values.id, values, {
          meta: { successCallback, failureCallback },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: usersSelectors.isFetchingItem,
  resource: usersSelectors.getItem,
  currentUser: currentUserSelector,
  error: usersSelectors.getFetchItemError,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(ProfilePage);
