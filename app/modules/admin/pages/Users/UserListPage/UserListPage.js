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

/* eslint-disable react/prefer-stateless-function */
class UserListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <UserList
        dataSource={this.props.users}
        loading={this.props.isFetching}
        fetch={this.props.fetchUsers}
      />
    );
  }
}

UserListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: params =>
      dispatch(
        userActions.fetchMany({ params: Object.assign({ count: 10 }, params) }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  users: userSelectors.getItems,
  isFetching: userSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UserListPage);
