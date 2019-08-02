import React from 'react';
import { FormattedMessage } from 'react-intl';

function createEnum(values) {
  function idToText(id) {
    return values[id] || 'Undefined';
  }

  function getFilterOptions() {
    return Object.keys(values).map(id => ({
      value: id,
      text: idToText(id),
    }));
  }

  function getValues() {
    return Object.keys(values).map(id => ({
      id: parseInt(id, 10),
      text: idToText(id),
    }));
  }

  return {
    idToText,
    getFilterOptions,
    getValues,
  };
}

export const tournamentFormatEnum = createEnum({
  1: <FormattedMessage id="app.enums.tournamentFormat.singlePlayer" />,
  2: <FormattedMessage id="app.enums.tournamentFormat.singleElimination" />,
  3: <FormattedMessage id="app.enums.tournamentFormat.doubleElimination" />,
  4: <FormattedMessage id="app.enums.tournamentFormat.table" />,
  5: <FormattedMessage id="app.enums.tournamentFormat.elo" />,
});

export const tournamentScopeEnum = createEnum({
  1: <FormattedMessage id="app.enums.tournamentScope.ongoing" />,
  2: <FormattedMessage id="app.enums.tournamentScope.deadline" />,
});

export const tournamentRankingStrategyEnum = createEnum({
  1: <FormattedMessage id="app.enums.rankingStrategy.maximum" />,
  2: <FormattedMessage id="app.enums.rankingStrategy.minimum" />,
});
