import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  actions as userActions,
  selectors as userSelectors,
} from '../../../ducks/users';
import UserList from '@/modules/admin/components/User/UserList';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';

/* eslint-disable react/prefer-stateless-function */
class UserListPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.userListPage)} />
        <UserList
          dataSource={this.props.users}
          loading={this.props.isFetching}
          fetch={this.props.fetchUsers}
          totalItems={this.props.totalItems}
        />
      </PageLayout>
    );
  }
}

UserListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: params =>
      dispatch(
        userActions.fetchMany(prepareFilterParams(params, 'username', true)),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  users: userSelectors.getItems,
  isFetching: userSelectors.isFetching,
  totalItems: userSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserListPage);
