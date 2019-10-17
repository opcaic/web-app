import { mapArrayToObject } from '@/modules/shared/helpers/utils';
import { tournamentRankingStrategyEnum } from '@/modules/shared/helpers/enumHelpers';

/*
 * Gets pairs of players competing in the first round.
 * For example:
 * [
 *    ["Player 1", "Player 2"],
 *    ["Player 3", "Player 4"],
 * ]
 */
function getInitialPlayerPairs(participations) {
  const totalPlayersCount = 2 ** Math.ceil(Math.log2(participations.length));
  const playerNamesByStartingSlot = mapArrayToObject(
    participations,
    x => x.startingSlot,
    x => x.author.username,
  );
  const playerPairs = [];

  for (let i = 0; i < totalPlayersCount; i += 2) {
    playerPairs.push([
      playerNamesByStartingSlot[i] || null,
      playerNamesByStartingSlot[i + 1] || null,
    ]);
  }

  return playerPairs;
}

/*
 * Multiplies all scores with -1
 */
function switchScores(matches) {
  Object.keys(matches).forEach(index => {
    // eslint-disable-next-line no-param-reassign
    matches[index].firstPlayer.score *= -1;
    // eslint-disable-next-line no-param-reassign
    matches[index].secondPlayer.score *= -1;
  });
}

/*
 * Get match score in the format [firstPlayerScore, secondPlayerScore]
 */
function getMatchScore(match) {
  return [match.firstPlayer.score, match.secondPlayer.score];
}

/*
 * Gets bracket matches in the following format:
 * [
 *    first round matches,
 *    second round matches,
 *    ...
 *    last round matches,
 * ]
 */
function getBracketMatches(matches, bracket) {
  const bracketMatches = [];

  bracket.forEach(bracketLevel => {
    const bracketLevelMatches = [];

    bracketLevel.forEach(matchIndex => {
      if (matchIndex == null) {
        bracketLevelMatches.push([null, null]);
        return;
      }

      const match = matches[matchIndex];
      bracketLevelMatches.push(getMatchScore(match));
    });

    bracketMatches.push(bracketLevelMatches);
  });

  return bracketMatches;
}

/*
 * Gets final matches
 */
function getFinalMatches(leaderboard) {
  const finalMatches = [
    [
      getMatchScore(leaderboard.matches[leaderboard.finalIndex]),
      getMatchScore(leaderboard.matches[leaderboard.consolationFinalIndex]),
    ],
  ];

  if (leaderboard.secondaryFinalIndex !== null) {
    const secondaryFinalScore = getMatchScore(
      leaderboard.matches[leaderboard.secondaryFinalIndex],
    );

    // Switch scores order because jquery-bracket plugin needs the same order as in the original final match
    finalMatches.push([[secondaryFinalScore[1], secondaryFinalScore[0]]]);
  }

  return finalMatches;
}

export function getDoubleEliminationBracket(leaderboard) {
  if (leaderboard.rankingStrategy === tournamentRankingStrategyEnum.MINIMUM) {
    switchScores(leaderboard.matches);
  }

  const initialPlayerPairs = getInitialPlayerPairs(leaderboard.participations);

  const winnersBracketMatches = getBracketMatches(
    leaderboard.matches,
    leaderboard.winnersBrackets,
  );

  const losersBracketMatches = getBracketMatches(
    leaderboard.matches,
    leaderboard.losersBrackets,
  );

  const finalMatches = getFinalMatches(leaderboard);

  return {
    teams: initialPlayerPairs,
    results: [winnersBracketMatches, losersBracketMatches, finalMatches],
  };
}

export function getSingleEliminationBracket(leaderboard) {
  if (leaderboard.rankingStrategy === tournamentRankingStrategyEnum.MINIMUM) {
    switchScores(leaderboard.matches);
  }

  const initialPlayerPairs = getInitialPlayerPairs(leaderboard.participations);

  const bracketMatches = getBracketMatches(
    leaderboard.matches,
    leaderboard.brackets,
  );

  return {
    teams: initialPlayerPairs,
    results: bracketMatches,
  };
}
