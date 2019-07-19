import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import PublicApp from '../../public';
import GlobalStyle from '../../../global-styles';
import AdminApp from '../../admin';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import { apiSaga } from '@/modules/shared/helpers/apiMiddleware';
import registrationReducer, {
  saga as registrationSaga,
} from '../ducks/registration';
import authReducer, { saga as authSaga } from '../ducks/auth';
import localizationReducer from '../ducks/localization';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.Component {
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

const withSagas = [
  injectSaga({ key: 'api', saga: apiSaga }),
  injectSaga({ key: 'registration', saga: registrationSaga }),
  injectSaga({ key: 'auth', saga: authSaga }),
];

const withReducers = [
  injectReducer({ key: 'registration', reducer: registrationReducer }),
  injectReducer({ key: 'auth', reducer: authReducer }),
  injectReducer({ key: 'language', reducer: localizationReducer }),
];

export default compose(
  ...withReducers,
  ...withSagas,
)(App);
