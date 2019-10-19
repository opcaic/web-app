import { tournamentFormatEnum } from '@/modules/shared/helpers/enumHelpers';

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
