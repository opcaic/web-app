import { Alert } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import withCurrentUser from '@/modules/shared/helpers/hocs/withCurrentUser';
import { tournamentStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { FormattedHTMLMessage } from 'react-intl';

function getCurrentPlace(tournament, leaderboard, currentUser) {
  if (!currentUser.id || !leaderboard || !tournament || !leaderboard.finished) {
    return null;
  }

  const participation = leaderboard.participations.find(
    x => x.author && x.author.id === currentUser.id,
  );

  if (!participation) {
    return null;
  }

  return participation.place;
}

const CurrentPlace = ({ tournament, leaderboard, currentUser }) => {
  const currentPlace = getCurrentPlace(tournament, leaderboard, currentUser);

  if (currentPlace === null) {
    return null;
  }

  const message =
    tournament.state === tournamentStateEnum.FINISHED ? (
      <FormattedHTMLMessage
        id="app.public.tournamentOverview.placeFinished"
        values={{ place: currentPlace }}
      />
    ) : (
      <FormattedHTMLMessage
        id="app.public.tournamentOverview.placeCurrent"
        values={{ place: currentPlace }}
      />
    );

  return (
    <Alert
      message={message}
      showIcon
      type="info"
      style={{ marginBottom: 20 }}
    />
  );
};

CurrentPlace.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
  leaderboard: PropTypes.object,
  currentUser: PropTypes.object,
};

export default withCurrentUser(CurrentPlace);
