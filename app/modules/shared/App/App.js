import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import PublicApp from '../../public';
import GlobalStyle from '../../../global-styles';
import AdminApp from '../../admin';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';

import { apiSaga } from '@/modules/shared/helpers/apiMiddleware';
import registrationReducer from '../../public/ducks/registration';
import authReducer, { saga as authSaga } from '../ducks/auth';
import submissionReducer, { saga as submissionSaga } from '../ducks/submission';
import uiReducer from '../ducks/ui';
import localizationReducer from '../ducks/localization';
import PrivateRoute from '@/modules/shared/containers/PrivateRoute/PrivateRoute';
import { initialLoadCompleted } from '@/modules/shared/selectors/auth';

const SpinnerContainer = styled.div`
  text-align: center;
  padding-top: calc(50vh - 18px);
`;

/* eslint-disable react/prefer-stateless-function */
export class App extends React.Component {
  render() {
    if (!this.props.initialLoadCompleted) {
      return (
        <SpinnerContainer>
          <Spin size="large" />
        </SpinnerContainer>
      );
    }

    return (
      <div>
        <Helmet>
          <title>{process.env.APP_NAME}</title>
        </Helmet>

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
  initialLoadCompleted: PropTypes.bool.isRequired,
};

const withSagas = [
  injectSaga({ key: 'api', saga: apiSaga }),
  injectSaga({ key: 'auth', saga: authSaga }),
  injectSaga({ key: 'submissionUpload', saga: submissionSaga }),
];

const withReducers = [
  injectReducer({ key: 'registration', reducer: registrationReducer }),
  injectReducer({ key: 'auth', reducer: authReducer }),
  injectReducer({ key: 'language', reducer: localizationReducer }),
  injectReducer({ key: 'ui', reducer: uiReducer }),
  injectReducer({ key: 'submissionUpload', reducer: submissionReducer }),
];

const mapStateToProps = createStructuredSelector({
  initialLoadCompleted,
});

const withConnect = connect(mapStateToProps);

export default compose(
  ...withReducers,
  ...withSagas,
  withRouter,
  withConnect,
)(App);
