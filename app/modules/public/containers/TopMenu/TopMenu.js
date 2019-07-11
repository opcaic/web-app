import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TopMenuComponent from '@/modules/public/components/TopMenu';
import { changeLocale } from '@/modules/shared/ducks/localization';

/* eslint-disable react/prefer-stateless-function */
export class TopMenu extends React.PureComponent {
  render() {
    return <TopMenuComponent changeLocale={this.props.changeLocale} />;
  }
}

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    changeLocale: locale => dispatch(changeLocale(locale)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TopMenu);
