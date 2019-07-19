import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { actions as usersActions } from '../../../ducks/users';
import UserList from '@/modules/admin/components/User/UserList';
import { isFetching, selectUsers } from '@/modules/admin/selectors/users';

/* eslint-disable react/prefer-stateless-function */
export class UsersListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <UserList dataSource={this.props.users} loading={this.props.isFetching} />
    );
  }
}

UsersListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchUsers: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchUsers: () => dispatch(usersActions.fetchMany()),
  };
}

const mapStateToProps = createStructuredSelector({
  users: selectUsers,
  isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UsersListPage);
