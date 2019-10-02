import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import TopMenuComponent from '@/modules/public/components/layout/TopMenu';
import { changeLocale } from '@/modules/shared/ducks/localization';
import { isLoggedIn } from '@/modules/shared/selectors/auth';
import { logout } from '@/modules/shared/ducks/auth';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';

const SyncedTopMenu = withSyncedActiveItems(TopMenuComponent, 'topMenu');

/* eslint-disable react/prefer-stateless-function */
export class TopMenu extends React.PureComponent {
  render() {
    return (
      <SyncedTopMenu
        changeLocale={this.props.changeLocale}
        isLoggedIn={this.props.isLoggedIn}
        logout={this.props.logout}
      />
    );
  }
}

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale, true)),
    logout: () => dispatch(logout()),
  };
}

const mapStateToProps = createStructuredSelector({
  isLoggedIn,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TopMenu);
