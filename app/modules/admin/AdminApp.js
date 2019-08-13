import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import UserListPage from '@/modules/admin/pages/Users/UserListPage';
import usersReducers from './ducks/users';
import gamesReducer, { saga as gamesSaga } from './ducks/games';
import tournamentsReducer, {
  saga as tournamentsSaga,
} from './ducks/tournaments';
import UserDetailPage from '@/modules/admin/pages/Users/UserDetailPage';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentListPage from '@/modules/admin/pages/Tournaments/TournamentListPage';
import DashboardPage from '@/modules/admin/pages/DashboardPage';
import GameListPage from '@/modules/admin/pages/Games/GameListPage';
import SystemPage from '@/modules/admin/pages/SystemPage';
import GameDetailPage from '@/modules/admin/pages/Games/GameDetailPage';
import GameNewPage from '@/modules/admin/pages/Games/GameNewPage';
import injectSaga from '@/utils/injectSaga';
import TournamentNewPage from '@/modules/admin/pages/Tournaments/TournamentNewPage';
import TournamentDetailPage from '@/modules/admin/pages/Tournaments/TournamentDetailPage';
import NotFoundPage from '@/modules/admin/pages/NotFoundPage';

// TODO: check if withMenuSync can be called directly in the component prop or if it should be declared beforehand

/* eslint-disable react/prefer-stateless-function */
export class AdminApp extends React.PureComponent {
  render() {
    return (
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
          path="/admin/tournaments/new"
          component={withMenuSync(TournamentNewPage, {
            adminSidebar: ['tournaments_list'],
          })}
        />
        <Route
          exact
          path="/admin/tournaments/:id"
          component={withMenuSync(TournamentDetailPage, {
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
          path="/admin/games/new"
          component={withMenuSync(GameNewPage, {
            adminSidebar: ['games_list'],
          })}
        />
        <Route
          exact
          path="/admin/games/:id"
          component={withMenuSync(GameDetailPage, {
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

        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [
  injectSaga({ key: 'games', saga: gamesSaga }),
  injectSaga({ key: 'tournaments', saga: tournamentsSaga }),
];
const withReducers = [
  injectReducer({ key: 'users', reducer: usersReducers }),
  injectReducer({ key: 'games', reducer: gamesReducer }),
  injectReducer({ key: 'tournaments', reducer: tournamentsReducer }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
