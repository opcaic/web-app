import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import PageLayout from './components/layout/PageLayout';
import TournamentCreatePage from './pages/Tournaments/TournamentCreatePage';
import TournamentListPage from './pages/Tournaments/TournamentListPage';
import tournamentsReducers from './ducks/tournaments';
import injectReducer from '../../utils/injectReducer';
import TournamentDetailPage from './pages/Tournaments/TournamentDetailPage';
import UserListPage from '@/modules/admin/pages/Users/UserListPage';
import usersReducers from './ducks/users';
import UserDetailPage from '@/modules/admin/pages/Users/UserDetail';

/* eslint-disable react/prefer-stateless-function */
export class AdminApp extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <Switch>
          <Route
            exact
            path="/admin/tournaments/create"
            component={TournamentCreatePage}
          />
          <Route
            exact
            path="/admin/tournaments/:id"
            component={TournamentDetailPage}
          />
          <Route
            exact
            path="/admin/tournaments/"
            component={TournamentListPage}
          />

          <Route exact path="/admin/users/" component={UserListPage} />
          <Route exact path="/admin/users/:id" component={UserDetailPage} />
        </Switch>
      </PageLayout>
    );
  }
}

const withSagas = [];
const withReducers = [
  injectReducer({ key: 'tournaments', reducer: tournamentsReducers }),
  injectReducer({ key: 'users', reducer: usersReducers }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
