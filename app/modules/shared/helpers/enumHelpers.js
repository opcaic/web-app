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

export const matchStateEnum = {
  QUEUED: 0,
  EXECUTED: 1,
  FAILED: 2,
};

matchStateEnum.helpers = createEnum(
  matchStateEnum,
  defineMessages({
    0: { id: 'app.enums.matchStateEnum.queued' },
    1: { id: 'app.enums.matchStateEnum.executed' },
    2: { id: 'app.enums.matchStateEnum.failed' },
  }),
);

export const entryPointResultEnum = {
  NOT_EXECUTED: 0,
  SUCCESS: 1,
  CANCELLED: 2,
  USER_ERROR: 3,
  MODULE_ERROR: 4,
  PLATFORM_ERROR: 5,
};

entryPointResultEnum.helpers = createEnum(
  entryPointResultEnum,
  defineMessages({
    0: { id: 'app.enums.entryPointResultEnum.notExecuted' },
    1: { id: 'app.enums.entryPointResultEnum.success' },
    2: { id: 'app.enums.entryPointResultEnum.cancelled' },
    3: { id: 'app.enums.entryPointResultEnum.userError' },
    4: { id: 'app.enums.entryPointResultEnum.moduleError' },
    5: { id: 'app.enums.entryPointResultEnum.platformError' },
  }),
);

export const menuItemTypeEnum = {
  DOCUMENT: 1,
  EXTERNAL: 2,
};

menuItemTypeEnum.helpers = createEnum(
  menuItemTypeEnum,
  defineMessages({
    1: { id: 'app.enums.menuItemType.document' },
    2: { id: 'app.enums.menuItemType.external' },
  }),
);
