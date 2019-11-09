import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';
import { defineMessages } from 'react-intl';
import React from 'react';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

export function getLeaderboardData(leaderboard) {
  if (!leaderboard) {
    return [];
  }

  if (
    leaderboard.finished === false &&
    leaderboard.format !== tournamentFormatEnum.ELO
  ) {
    return [];
  }

  return addSharedPlaces(leaderboard.participations);
}

export function addSharedPlaces(participations) {
  const sharedPlacesCount = {};

  participations.forEach(x => {
    if (!sharedPlacesCount[x.place]) {
      sharedPlacesCount[x.place] = 0;
    }

    sharedPlacesCount[x.place] += 1;
  });

  return participations.map(x =>
    Object.assign({ placeShared: x.place + sharedPlacesCount[x.place] - 1 }, x),
  );
}

export function getPlaceText(record) {
  if (record.place !== record.placeShared) {
    return `${record.place}.-${record.placeShared}.`;
  }

  return `${record.place}.`;
}

const participationIntlMessages = defineMessages({
  anonymous: { id: 'app.shared.leaderboards.anonymous' },
  anonymousShort: { id: 'app.shared.leaderboards.anonymousShort' },
});

export function getParticipationUsername(participation, withFormatting = true) {
  if (participation.author !== null) {
    return participation.author.username;
  }

  if (withFormatting) {
    return (
      <i>
        {intlGlobal.formatMessage(participationIntlMessages.anonymous, {
          id: participation.submissionId,
        })}
      </i>
    );
  }

  return intlGlobal.formatMessage(participationIntlMessages.anonymousShort, {
    id: participation.submissionId,
  });
}
