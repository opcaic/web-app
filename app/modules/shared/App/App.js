import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import PublicApp from '../../public';
import GlobalStyle from '../../../global-styles';
import AdminApp from '../../admin';
import injectSaga from '@/utils/injectSaga';
import { apiSaga } from '@/modules/shared/helpers/apiMiddleware';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.PureComponent {
  render() {
    return (
      <div>
        <GlobalStyle />
        <Switch>
          <Route path="/admin" component={AdminApp} />
          <Route path="/" component={PublicApp} />
        </Switch>
      </div>
    );
  }
}

const withSagas = [injectSaga({ key: 'api', saga: apiSaga })];
const withReducers = [];

export default compose(
  ...withReducers,
  ...withSagas,
)(App);
