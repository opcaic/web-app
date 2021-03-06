import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from '../../utils/injectReducer';
import usersReducers, { saga as usersSaga } from './ducks/users';
import gamesReducer, { saga as gamesSaga } from './ducks/games';
import documentsReducer, { saga as documentsSaga } from './ducks/documents';
import { saga as tournamentStateSaga } from './ducks/tournamentState';
import matchesReducer, { saga as matchesSaga } from './ducks/matches';
import leaderboardsReducer from './ducks/leaderboards';
import submissionsReducer from './ducks/submissions';
import validationsReducer from './ducks/validations';
import workersReducer from './ducks/workers';
import emailTemplatesReducer, {
  saga as emailTemplatesSaga,
} from './ducks/emailTemplates';
import tournamentsReducer, {
  saga as tournamentsSaga,
} from './ducks/tournaments';
import tournamentParticipantsReducer, {
  saga as tournamentParticipantsSaga,
} from './ducks/tournamentParticipants';
import tournamentManagersReducer, {
  saga as tournamentManagersSaga,
} from './ducks/tournamentManagers';
import tournamentFilesReducer, {
  saga as tournamentFilesSaga,
} from './ducks/tournamentFiles';
import systemItemsReducer, {
  saga as systemItemsSaga,
} from './ducks/systemItems';
import invalidSubmissionsReducer from './ducks/invalidSubmissions';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import DashboardPage from '@/modules/admin/pages/DashboardPage';
import SystemPage from '@/modules/admin/pages/SystemPage';
import injectSaga from '@/utils/injectSaga';
import NotFoundPage from '@/modules/admin/pages/NotFoundPage';
import TournamentRoutes from '@/modules/admin/pages/Tournaments/TournamentRoutes/TournamentRoutes';
import UserRoutes from '@/modules/admin/pages/Users/UserRoutes';
import GameRoutes from '@/modules/admin/pages/Games/GameRoutes';
import AuthorizedRoute from '../shared/containers/AuthorizedRoute/AuthorizedRoute';
import EmailTemplateRoutes from '@/modules/admin/pages/EmailTemplates/EmailTemplateRoutes';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';

// TODO: check if withMenuSync can be called directly in the component prop or if it should be declared beforehand

/* eslint-disable react/prefer-stateless-function */
export class AdminApp extends React.PureComponent {
  render() {
    return (
      <Switch>
        <AuthorizedRoute
          exact
          path="/admin/"
          requiredRole={userRoleEnum.ORGANIZER}
          component={withMenuSync(DashboardPage, {
            adminSidebar: ['dashboard'],
          })}
        />

        <AuthorizedRoute
          path="/admin/tournaments/"
          requiredRole={userRoleEnum.ORGANIZER}
          component={TournamentRoutes}
        />

        <AuthorizedRoute
          path="/admin/games/"
          requiredRole={userRoleEnum.ORGANIZER}
          component={GameRoutes}
        />

        <AuthorizedRoute
          path="/admin/users/"
          requiredRole={userRoleEnum.ADMIN}
          component={UserRoutes}
        />

        <AuthorizedRoute
          path="/admin/emailTemplates"
          requiredRole={userRoleEnum.ADMIN}
          component={EmailTemplateRoutes}
        />

        <AuthorizedRoute
          exact
          path="/admin/system/"
          requiredRole={userRoleEnum.ADMIN}
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
  injectSaga({ key: 'tournamentManagers', saga: tournamentManagersSaga }),
  injectSaga({ key: 'documents', saga: documentsSaga }),
  injectSaga({ key: 'tournamentState', saga: tournamentStateSaga }),
  injectSaga({ key: 'emailTemplates', saga: emailTemplatesSaga }),
  injectSaga({ key: 'tournamentFiles', saga: tournamentFilesSaga }),
  injectSaga({ key: 'users', saga: usersSaga }),
  injectSaga({ key: 'systemItems', saga: systemItemsSaga }),
  injectSaga({ key: 'matches', saga: matchesSaga }),
];
const withReducers = [
  injectReducer({ key: 'users', reducer: usersReducers }),
  injectReducer({ key: 'games', reducer: gamesReducer }),
  injectReducer({ key: 'tournaments', reducer: tournamentsReducer }),
  injectReducer({
    key: 'tournamentParticipants',
    reducer: tournamentParticipantsReducer,
  }),
  injectReducer({
    key: 'tournamentManagers',
    reducer: tournamentManagersReducer,
  }),
  injectReducer({ key: 'documents', reducer: documentsReducer }),
  injectReducer({ key: 'matches', reducer: matchesReducer }),
  injectReducer({ key: 'leaderboards', reducer: leaderboardsReducer }),
  injectReducer({ key: 'submissions', reducer: submissionsReducer }),
  injectReducer({ key: 'validations', reducer: validationsReducer }),
  injectReducer({
    key: 'tournamentFilesUpload',
    reducer: tournamentFilesReducer,
  }),
  injectReducer({ key: 'workers', reducer: workersReducer }),
  injectReducer({ key: 'emailTemplates', reducer: emailTemplatesReducer }),
  injectReducer({ key: 'systemItems', reducer: systemItemsReducer }),
  injectReducer({
    key: 'invalidSubmissions',
    reducer: invalidSubmissionsReducer,
  }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(AdminApp);
