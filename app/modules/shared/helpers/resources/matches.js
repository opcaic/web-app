import {
  matchResultEnum,
  tournamentRankingStrategyEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export function addLastExecution(item) {
  return Object.assign(item, {
    lastExecution: item.executions[item.executions.length - 1],
  });
}

export function getBestScore(botResults, rankingStrategy) {
  if (rankingStrategy === tournamentRankingStrategyEnum.MAXIMUM) {
    return Math.max(...botResults.map(x => x.score));
  }
  return Math.min(...botResults.map(x => x.score));
}

export function getUserResult(userId, botResults, rankingStrategy) {
  const bestScore = getBestScore(botResults, rankingStrategy);
  const bestScoreResults = botResults.filter(x => x.score === bestScore);
  const hasBestScore = bestScoreResults.find(
    x => x.submission.author && x.submission.author.id === userId,
  );

  if (hasBestScore) {
    if (bestScoreResults.length === 1) {
      return matchResultEnum.WINNER;
    }

    return matchResultEnum.TIE;
  }

  return matchResultEnum.LOSER;
}

export function formatScore(score) {
  return +score.toFixed(2);
}

export function getSubmissionUsername(submission) {
  if (submission.author !== null) {
    return submission.author.username;
  }

  return (
    <i>
      <FormattedMessage
        id="app.shared.matches.anonymous"
        values={{ id: submission.id }}
      />
    </i>
  );
}
