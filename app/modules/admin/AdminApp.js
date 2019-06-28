import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import PageLayout from './components/layout/PageLayout';
import TournamentCreatePage from './pages/Tournaments/TournamentCreatePage';
import TournamentListPage from './pages/Tournaments/TournamentListPage';
import tournamentsReducers from './ducks/tournaments';
import injectReducer from '../../utils/injectReducer';
import TournamentDetailPage from './pages/Tournaments/TournamentDetailPage';

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
        </Switch>
      </PageLayout>
    );
  }
}

const withSagas = [];
const withReducers = [
  injectReducer({ key: 'tournaments', reducer: tournamentsReducers }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
