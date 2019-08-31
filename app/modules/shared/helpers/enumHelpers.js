import { defineMessages } from 'react-intl';
import { intl } from '@/modules/shared/helpers/IntlGlobalProvider';

function createEnum(values, intlMessages) {
  const valuesCopy = Object.assign({}, values);

  function idToText(id) {
    return intl.formatMessage(intlMessages[id]) || 'Undefined';
  }

  function getFilterOptions() {
    return Object.values(valuesCopy).map(id => ({
      value: id,
      text: idToText(id),
    }));
  }

  function getValues() {
    return Object.values(valuesCopy).map(id => ({
      id: parseInt(id, 10),
      text: idToText(id),
    }));
  }

  // TODO: remove later, back compat
  // eslint-disable-next-line no-param-reassign
  values.idToText = idToText;
  // eslint-disable-next-line no-param-reassign
  values.getFilterOptions = getFilterOptions;
  // eslint-disable-next-line no-param-reassign
  values.getValues = getValues;

  return {
    idToText,
    getFilterOptions,
    getValues,
  };
}

export const tournamentFormatEnum = {
  SINGLE_PLAYER: 1,
  SINGLE_ELIMINATION: 2,
  DOUBLE_ELIMINATION: 3,
  TABLE: 4,
  ELO: 5,
};

tournamentFormatEnum.helpers = createEnum(
  tournamentFormatEnum,
  defineMessages({
    1: { id: 'app.enums.tournamentFormat.singlePlayer' },
    2: { id: 'app.enums.tournamentFormat.singleElimination' },
    3: { id: 'app.enums.tournamentFormat.doubleElimination' },
    4: { id: 'app.enums.tournamentFormat.table' },
    5: { id: 'app.enums.tournamentFormat.elo' },
  }),
);

export const tournamentRankingStrategyEnum = {
  MAXIMUM: 1,
  MINIMUM: 2,
};

tournamentRankingStrategyEnum.helpers = createEnum(
  tournamentRankingStrategyEnum,
  defineMessages({
    1: { id: 'app.enums.rankingStrategy.maximum' },
    2: { id: 'app.enums.rankingStrategy.minimum' },
  }),
);

export const tournamentScopeEnum = {
  DEADLINE: 1,
  ONGOING: 2,
};

tournamentScopeEnum.helpers = createEnum(
  tournamentScopeEnum,
  defineMessages({
    1: { id: 'app.enums.tournamentScope.deadline' },
    2: { id: 'app.enums.tournamentScope.ongoing' },
  }),
);

export const tournamentAvailabilityEnum = {
  PUBLIC: 1,
  PRIVATE: 2,
};

tournamentAvailabilityEnum.helpers = createEnum(
  tournamentAvailabilityEnum,
  defineMessages({
    1: { id: 'app.enums.tournamentAvailability.public' },
    2: { id: 'app.enums.tournamentAvailability.private' },
  }),
);
