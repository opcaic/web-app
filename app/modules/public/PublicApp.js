import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import NotFoundPage from '@/modules/public/pages/NotFoundPage';
import LoginPage from '@/modules/public/pages/User/LoginPage';
import RegisterPage from '@/modules/public/pages/User/RegisterPage';

import tournamentsReducers from './ducks/tournaments';
import tournamentsFeaturedReducers from './ducks/tournamentsFeatured';
import gamesReducers from './ducks/games';
import gamesFeaturedReducers from './ducks/gamesFeatured';
import matchesReducers from './ducks/matches';
import submissionsReducers from './ducks/submissions';
import documentsReducers from './ducks/documents';
import leaderboardsReducers from './ducks/leaderboards';
import validationsReducers from './ducks/validations';
import RegistrationSuccessfulPage from '@/modules/public/pages/User/RegistrationSuccessfulPage';
import TournamentListPage from '@/modules/public/pages/Tournaments/TournamentListPage';
import GameListPage from '@/modules/public/pages/Games/GameListPage/GameListPage';
import TournamentDetailPage from '@/modules/public/pages/Tournaments/TournamentDetailPage/TournamentDetailPage';
import ForgotPasswordPage from '@/modules/public/pages/User/ForgotPasswordPage';
import ResetPasswordPage from '@/modules/public/pages/User/ResetPasswordPage';
import ConfirmEmailPage from '@/modules/public/pages/User/ConfirmEmailPage';
import { saga as accountsSaga } from './ducks/accounts';
import { saga as registrationSaga } from '@/modules/public/ducks/registration';
import usersReducers, { saga as usersSaga } from '@/modules/public/ducks/users';
import SettingsPage from '@/modules/public/pages/Settings/SettingsPage';
import PrivateRoute from '@/modules/shared/containers/PrivateRoute/PrivateRoute';
import { handleCookieConsent } from '@/modules/shared/helpers/utils';
import HomePageSwitch from '@/modules/public/pages/Home/HomePageSwitch/HomePageSwitch';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import GameDetailPage from '@/modules/public/pages/Games/GameDetailPage';

const MenuSyncedHomePageSwitch = withMenuSync(HomePageSwitch, {
  topMenu: ['home'],
});

const MenuSyncedTournamentListPage = withMenuSync(TournamentListPage, {
  topMenu: ['tournaments'],
});

const MenuSyncedTournamentDetailPage = withMenuSync(TournamentDetailPage, {
  topMenu: ['tournaments'],
});

const MenuSyncedGameListPage = withMenuSync(GameListPage, {
  topMenu: ['games'],
});

const MenuSyncedGameDetailPage = withMenuSync(GameDetailPage, {
  topMenu: ['games'],
});

/* eslint-disable react/prefer-stateless-function */
export class PublicApp extends React.Component {
  componentDidMount() {
    handleCookieConsent();
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={MenuSyncedHomePageSwitch} />
        <Route
          exact
          path="/tournaments"
          component={MenuSyncedTournamentListPage}
        />
        <Route
          path="/tournaments/:id"
          component={MenuSyncedTournamentDetailPage}
        />

        <Route exact path="/games" component={MenuSyncedGameListPage} />
        <Route path="/games/:id" component={MenuSyncedGameDetailPage} />

        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <Route path="/confirm-email" component={ConfirmEmailPage} />
        <Route
          path="/registration-successful"
          component={RegistrationSuccessfulPage}
        />

        <PrivateRoute path="/settings" component={SettingsPage} />

        <Route path="/" component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [
  injectSaga({ key: 'accounts', saga: accountsSaga }),
  injectSaga({ key: 'registration', saga: registrationSaga }),
  injectSaga({ key: 'users', saga: usersSaga }),
];

const withReducers = [
  injectReducer({ key: 'tournaments', reducer: tournamentsReducers }),
  injectReducer({
    key: 'tournamentsFeatured',
    reducer: tournamentsFeaturedReducers,
  }),
  injectReducer({ key: 'games', reducer: gamesReducers }),
  injectReducer({ key: 'gamesFeatured', reducer: gamesFeaturedReducers }),
  injectReducer({ key: 'matches', reducer: matchesReducers }),
  injectReducer({ key: 'submissions', reducer: submissionsReducers }),
  injectReducer({ key: 'documents', reducer: documentsReducers }),
  injectReducer({ key: 'leaderboards', reducer: leaderboardsReducers }),
  injectReducer({ key: 'validations', reducer: validationsReducers }),
  injectReducer({ key: 'users', reducer: usersReducers }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(PublicApp);
