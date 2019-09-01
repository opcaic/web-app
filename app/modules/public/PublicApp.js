import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';

import HomePage from '@/modules/public/pages/HomePage';
import CompetitionPage from '@/modules/public/pages/CompetitionPage';
import NotFoundPage from '@/modules/public/pages/NotFoundPage';
import CompetitionsPage from '@/modules/public/pages/CompetitionsPage';
import LoginPage from '@/modules/public/pages/User/LoginPage';
import RegisterPage from '@/modules/public/pages/User/RegisterPage';

// import competitionsSaga from './ducks/competitions/sagas';
import competitionsReducer from './ducks/competitions/reducers';
import tournamentsReducers from './ducks/tournaments';
import { saga as accountsSaga } from './ducks/accounts';
import RegistrationSuccessfulPage from '@/modules/public/pages/User/RegistrationSuccessfulPage';
import ForgotPasswordPage from '@/modules/public/pages/User/ForgotPasswordPage';
import injectSaga from '@/utils/injectSaga';
import ResetPasswordPage from '@/modules/public/pages/User/ResetPasswordPage';
import ConfirmEmailPage from '@/modules/public/pages/User/ConfirmEmailPage';
import { saga as registrationSaga } from '@/modules/public/ducks/registration';

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
        <Route path="/forgot-password" component={ForgotPasswordPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <Route path="/confirm-email" component={ConfirmEmailPage} />
        <Route
          path="/registration-successful"
          component={RegistrationSuccessfulPage}
        />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [
  injectSaga({ key: 'accounts', saga: accountsSaga }),
  injectSaga({ key: 'registration', saga: registrationSaga }),
];
const withReducers = [
  injectReducer({ key: 'competitions', reducer: competitionsReducer }),
  injectReducer({ key: 'tournaments', reducer: tournamentsReducers }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(PublicApp);
