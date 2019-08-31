import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';

import HomePage from '@/modules/public/pages/HomePage';
import NotFoundPage from '@/modules/public/pages/NotFoundPage';
import LoginPage from '@/modules/public/pages/User/LoginPage';
import RegisterPage from '@/modules/public/pages/User/RegisterPage';

// import competitionsSaga from './ducks/competitions/sagas';
import tournamentsReducers from './ducks/tournaments';
import tournamentsFeaturedReducers from './ducks/tournamentsFeatured';
import gamesReducers from './ducks/games';
import gamesFeaturedReducers from './ducks/gamesFeatured';
import matchesReducers from './ducks/matches';
import submissionsReducers from './ducks/submissions';
import RegistrationSuccessfulPage from '@/modules/public/pages/User/RegistrationSuccessfulPage';
import TournamentListPage from '@/modules/public/pages/Tournaments/TournamentListPage';
import GameListPage from '@/modules/public/pages/Games/GameListPage/GameListPage';
import TournamentDetailPage from '@/modules/public/pages/Tournaments/TournamentDetailPage/TournamentDetailPage';

/* eslint-disable react/prefer-stateless-function */
export class PublicApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/tournaments" component={TournamentListPage} />
        <Route path="/tournaments/:id" component={TournamentDetailPage} />
        <Route exact path="/games" component={GameListPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route
          path="/registration-successful"
          component={RegistrationSuccessfulPage}
        />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [];

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
];

export default compose(
  ...withReducers,
  ...withSagas,
)(PublicApp);
