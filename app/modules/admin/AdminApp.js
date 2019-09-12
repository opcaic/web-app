import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import usersReducers from './ducks/users';
import gamesReducer, { saga as gamesSaga } from './ducks/games';
import documentsReducer, { saga as documentsSaga } from './ducks/documents';
import matchesReducer from './ducks/matches';
import leaderboardsReducer from './ducks/leaderboards';
import tournamentsReducer, {
  saga as tournamentsSaga,
} from './ducks/tournaments';
import tournamentParticipantsReducer, {
  saga as tournamentParticipantsSaga,
} from './ducks/tournamentParticipants';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import DashboardPage from '@/modules/admin/pages/DashboardPage';
import SystemPage from '@/modules/admin/pages/SystemPage';
import injectSaga from '@/utils/injectSaga';
import NotFoundPage from '@/modules/admin/pages/NotFoundPage';
import TournamentRoutes from '@/modules/admin/pages/Tournaments/TournamentRoutes/TournamentRoutes';
import UserRoutes from '@/modules/admin/pages/Users/UserRoutes';
import GameRoutes from '@/modules/admin/pages/Games/GameRoutes';
import AuthorizedRoute from '../shared/containers/AuthorizedRoute/AuthorizedRoute';
import { ROLE_ORGANIZER, ROLE_ADMIN } from '../shared/helpers/roles';

// TODO: check if withMenuSync can be called directly in the component prop or if it should be declared beforehand

/* eslint-disable react/prefer-stateless-function */
export class AdminApp extends React.PureComponent {
  render() {
    return (
      <Switch>
        <AuthorizedRoute
          exact
          path="/admin/"
          requiredRole={ROLE_ORGANIZER}
          component={withMenuSync(DashboardPage, {
            adminSidebar: ['dashboard'],
          })}
        />

        <AuthorizedRoute
          path="/admin/tournaments/"
          requiredRole={ROLE_ORGANIZER}
          component={TournamentRoutes}
        />

        <AuthorizedRoute
          path="/admin/games/"
          requiredRole={ROLE_ORGANIZER}
          component={GameRoutes}
        />

        <AuthorizedRoute
          path="/admin/users/"
          requiredRole={ROLE_ADMIN}
          component={UserRoutes}
        />

        <AuthorizedRoute
          exact
          path="/admin/system/"
          requiredRole={ROLE_ADMIN}
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
  injectSaga({
    key: 'tournamentParticipants',
    saga: tournamentParticipantsSaga,
  }),
  injectSaga({ key: 'documents', saga: documentsSaga }),
];
const withReducers = [
  injectReducer({ key: 'users', reducer: usersReducers }),
  injectReducer({ key: 'games', reducer: gamesReducer }),
  injectReducer({ key: 'tournaments', reducer: tournamentsReducer }),
  injectReducer({
    key: 'tournamentParticipants',
    reducer: tournamentParticipantsReducer,
  }),
  injectReducer({ key: 'documents', reducer: documentsReducer }),
  injectReducer({ key: 'matches', reducer: matchesReducer }),
  injectReducer({ key: 'leaderboards', reducer: leaderboardsReducer }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
