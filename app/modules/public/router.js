import { Route, Switch } from 'react-router-dom';
import React from 'react';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import HomePage from '@/modules/public/pages/HomePage';
import CompetitionPage from '@/modules/public/pages/CompetitionPage';
import NotFoundPage from '@/modules/public/pages/NotFoundPage';
import CompetitionsPage from '@/modules/public/pages/CompetitionsPage';

import competitionsSaga from './ducks/competitions/sagas';
import competitionsReducer from './ducks/competitions/reducers';

/* eslint-disable react/prefer-stateless-function */
export class PublicRouter extends React.PureComponent {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/competitions" component={CompetitionsPage} />
        <Route path="/competition/:slug" component={CompetitionPage} />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    );
  }
}

const withSagas = [injectSaga({ key: 'competitions', saga: competitionsSaga })];
const withReducers = [
  injectReducer({ key: 'competitions', reducer: competitionsReducer }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(PublicRouter);
