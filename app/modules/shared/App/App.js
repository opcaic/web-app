import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import PublicApp from '../../public';
import GlobalStyle from '../../../global-styles';
import AdminApp from '../../admin';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import { apiSaga } from '@/modules/shared/helpers/apiMiddleware';
import registrationReducer, {
  saga as registrationSaga,
} from '../ducks/registration';
import authReducer, { saga as authSaga, loadAuth } from '../ducks/auth';
import localizationReducer from '../ducks/localization';
import PrivateRoute from '@/modules/shared/containers/PrivateRoute/PrivateRoute';
import { initialLoadCompleted } from '@/modules/shared/selectors/auth';

/* eslint-disable react/prefer-stateless-function */
export class App extends React.Component {
  componentWillMount() {
    this.props.loadAuth();
  }

  render() {
    if (!this.props.initialLoadCompleted) {
      return <Spin size="large" />;
    }

    return (
      <div>
        <GlobalStyle />
        <Switch>
          <PrivateRoute path="/admin" component={AdminApp} />
          <Route path="/" component={PublicApp} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  loadAuth: PropTypes.func.isRequired,
  initialLoadCompleted: PropTypes.bool.isRequired,
};

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

const mapStateToProps = createStructuredSelector({
  initialLoadCompleted,
});

export function mapDispatchToProps(dispatch) {
  return {
    loadAuth: () => dispatch(loadAuth()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  ...withReducers,
  ...withSagas,
  withRouter,
  withConnect,
)(App);
