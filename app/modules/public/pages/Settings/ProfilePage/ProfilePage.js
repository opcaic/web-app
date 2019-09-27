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
import Spin from '@/modules/shared/components/Spin';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import ProfileForm from '@/modules/public/components/Account/ProfileForm';
import { currentUserSelector } from '@/modules/shared/selectors/auth';

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

        <Spin spinning={this.props.isFetching}>
          <ProfileForm
            resource={this.props.resource || {}}
            onSubmit={this.onSubmit}
          />
        </Spin>
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(ProfilePage);
