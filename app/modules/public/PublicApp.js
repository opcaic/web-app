import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';

import HomePage from '@/modules/public/pages/HomePage';
import CompetitionPage from '@/modules/public/pages/CompetitionPage';
import NotFoundPage from '@/modules/public/pages/NotFoundPage';
import CompetitionsPage from '@/modules/public/pages/CompetitionsPage';
import LoginPage from '@/modules/public/pages/LoginPage';
import RegisterPage from '@/modules/public/pages/RegisterPage';

// import competitionsSaga from './ducks/competitions/sagas';
import competitionsReducer from './ducks/competitions/reducers';
import tournamentsReducers from './ducks/tournaments';

/* eslint-disable react/prefer-stateless-function */
export class PublicApp extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/competitions" component={CompetitionsPage} />
        <Route path="/competition/:slug" component={CompetitionPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [
  /* injectSaga({ key: 'competitions', saga: competitionsSaga }) */
];
const withReducers = [
  injectReducer({ key: 'competitions', reducer: competitionsReducer }),
  injectReducer({ key: 'tournaments', reducer: tournamentsReducers }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(PublicApp);
