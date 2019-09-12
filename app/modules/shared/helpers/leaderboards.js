export function addSharedPlaces(leaderboard) {
  const sharedPlacesCount = new Array(leaderboard.length + 1);

  leaderboard.forEach(x => {
    sharedPlacesCount[x.place] += 1;
  });

  return leaderboard.map(x =>
    Object.assign({ placeShared: x.place + sharedPlacesCount[x.place] - 1 }, x),
  );
}
