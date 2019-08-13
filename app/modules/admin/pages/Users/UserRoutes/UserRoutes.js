import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import UserListPage from '@/modules/admin/pages/Users/UserListPage/UserListPage';
import UserDetailPage from '@/modules/admin/pages/Users/UserDetailPage/UserDetailPage';

const UserRoutes = () => (
  <Switch>
    <Route
      exact
      path="/admin/users/"
      component={withMenuSync(UserListPage, {
        adminSidebar: ['users_list'],
      })}
    />
    <Route
      exact
      path="/admin/users/:id"
      component={withMenuSync(UserDetailPage, {
        adminSidebar: ['users_list'],
      })}
    />
  </Switch>
);

export default UserRoutes;
