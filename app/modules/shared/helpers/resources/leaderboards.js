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

function addSharedPlaces(leaderboard) {
  const sharedPlacesCount = {};

  leaderboard.forEach(x => {
    if (!sharedPlacesCount[x.place]) {
      sharedPlacesCount[x.place] = 0;
    }

    sharedPlacesCount[x.place] += 1;
  });

  return leaderboard.map(x =>
    Object.assign({ placeShared: x.place + sharedPlacesCount[x.place] - 1 }, x),
  );
}
