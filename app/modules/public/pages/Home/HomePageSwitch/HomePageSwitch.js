import React from 'react';
import { createStructuredSelector } from 'reselect';
import { isLoggedIn } from '@/modules/shared/selectors/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardPage from '@/modules/public/pages/Home/DashboardPage';
import LandingPage from '@/modules/public/pages/Home/LandingPage/LandingPage';

/* eslint-disable react/prefer-stateless-function */
export class HomePageSwitch extends React.PureComponent {
  render() {
    return this.props.isLoggedInValue ? <DashboardPage /> : <LandingPage />;
  }
}

HomePageSwitch.propTypes = {
  isLoggedInValue: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoggedInValue: isLoggedIn,
});

export default connect(mapStateToProps)(HomePageSwitch);
