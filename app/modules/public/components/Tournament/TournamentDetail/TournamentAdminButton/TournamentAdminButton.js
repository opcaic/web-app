import React from 'react';
import PropTypes from 'prop-types';
import withCurrentUser from '@/modules/shared/helpers/hocs/withCurrentUser';
import { Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';
import { compose } from 'redux';

const TournamentAdminButton = ({ currentUser, url, match }) => {
  if (
    currentUser.role !== userRoleEnum.ADMIN &&
    currentUser.role !== userRoleEnum.ORGANIZER
  ) {
    return null;
  }

  return (
    <Button type="default" size="small">
      <Link to={url || `/admin${match.url}`}>
        <FormattedMessage id="app.public.tournamentAdminButton.showInAdministration" />
      </Link>
    </Button>
  );
};

TournamentAdminButton.propTypes = {
  currentUser: PropTypes.object,
  url: PropTypes.string,
  match: PropTypes.object,
};

export default compose(
  withCurrentUser,
  withRouter,
)(TournamentAdminButton);
