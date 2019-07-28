import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import PageLayout from './components/layout/PageLayout';
import injectReducer from '../../utils/injectReducer';
import UserListPage from '@/modules/admin/pages/Users/UserListPage';
import usersReducers from './ducks/users';
import UserDetailPage from '@/modules/admin/pages/Users/UserDetailPage';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentListPage from '@/modules/admin/pages/Tournaments/TournamentListPage';
import DashboardPage from '@/modules/admin/pages/DashboardPage';
import GameListPage from '@/modules/admin/pages/Games/GameListPage';
import SystemPage from '@/modules/admin/pages/SystemPage';

// TODO: check if withMenuSync can be called directly in the component prop or if it should be declared beforehand

/* eslint-disable react/prefer-stateless-function */
export class AdminApp extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <Switch>
          <Route
            exact
            path="/admin/"
            component={withMenuSync(DashboardPage, {
              adminSidebar: ['dashboard'],
            })}
          />

          <Route
            exact
            path="/admin/tournaments/"
            component={withMenuSync(TournamentListPage, {
              adminSidebar: ['tournaments_list'],
            })}
          />

          <Route
            exact
            path="/admin/games/"
            component={withMenuSync(GameListPage, {
              adminSidebar: ['games_list'],
            })}
          />

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

          <Route
            exact
            path="/admin/system/"
            component={withMenuSync(SystemPage, {
              adminSidebar: ['system'],
            })}
          />
        </Switch>
      </PageLayout>
    );
  }
}

const withSagas = [];
const withReducers = [injectReducer({ key: 'users', reducer: usersReducers })];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
