import { defineMessages } from 'react-intl';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';

function createEnum(values, intlMessages) {
  const valuesCopy = Object.assign({}, values);

  function idToText(id) {
    return intlGlobal.formatMessage(intlMessages[id]) || 'Undefined';
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

export const isFormatForScope = (scope, format) =>
  format === tournamentFormatEnum.ELO
    ? scope === tournamentScopeEnum.ONGOING
    : scope === tournamentScopeEnum.DEADLINE;

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

export const tournamentStateEnum = {
  CREATED: 0,
  PUBLISHED: 1,
  RUNNING: 2,
  WAITING_FOR_FINISH: 3,
  FINISHED: 4,
  PAUSED: 5,
};

tournamentStateEnum.helpers = createEnum(
  tournamentStateEnum,
  defineMessages({
    0: { id: 'app.enums.tournamentState.created' },
    1: { id: 'app.enums.tournamentState.published' },
    2: { id: 'app.enums.tournamentState.running' },
    3: { id: 'app.enums.tournamentState.waitingForFinish' },
    4: { id: 'app.enums.tournamentState.finished' },
    5: { id: 'app.enums.tournamentState.paused' },
  }),
);

export const tournamentSimplifiedStateEnum = {
  RUNNING: 0,
  EVALUATING: 1,
  PAUSED: 2,
  FINISHED: 3,
};

tournamentSimplifiedStateEnum.helpers = createEnum(
  tournamentSimplifiedStateEnum,
  defineMessages({
    0: { id: 'app.enums.tournamentSimplifiedState.running' },
    1: { id: 'app.enums.tournamentSimplifiedState.evaluating' },
    2: { id: 'app.enums.tournamentSimplifiedState.paused' },
    3: { id: 'app.enums.tournamentSimplifiedState.finished' },
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
  DOCUMENT: 0,
  EXTERNAL: 1,
};

menuItemTypeEnum.helpers = createEnum(
  menuItemTypeEnum,
  defineMessages({
    0: { id: 'app.enums.menuItemType.document' },
    1: { id: 'app.enums.menuItemType.external' },
  }),
);

export const submissionValidationStateEnum = {
  QUEUED: 0,
  VALID: 1,
  INVALID: 2,
  ERROR: 3,
};

submissionValidationStateEnum.helpers = createEnum(
  submissionValidationStateEnum,
  defineMessages({
    0: { id: 'app.enums.submissionValidationState.queued' },
    1: { id: 'app.enums.submissionValidationState.valid' },
    2: { id: 'app.enums.submissionValidationState.invalid' },
    3: { id: 'app.enums.submissionValidationState.error' },
  }),
);

export const matchResultEnum = {
  WINNER: 0,
  TIE: 1,
  LOSER: 2,
};

matchResultEnum.helpers = createEnum(
  matchResultEnum,
  defineMessages({
    0: { id: 'app.enums.matchResult.winner' },
    1: { id: 'app.enums.matchResult.tie' },
    2: { id: 'app.enums.matchResult.loser' },
  }),
);

export const tournamentRunningSortEnum = {
  DEADLINE_SOON_FIRST: 0,
  DEADLINE_SOON_LAST: 1,
};

tournamentRunningSortEnum.helpers = createEnum(
  tournamentRunningSortEnum,
  defineMessages({
    0: { id: 'app.enums.tournamentRunningSort.deadlineSoonFirst' },
    1: { id: 'app.enums.tournamentRunningSort.deadlineSoonLast' },
  }),
);

export const tournamentFinishedSortEnum = {
  FINISHED_RECENTLY_FIRST: 0,
  FINISHED_RECENTLY_LAST: 1,
};

tournamentFinishedSortEnum.helpers = createEnum(
  tournamentFinishedSortEnum,
  defineMessages({
    0: { id: 'app.enums.tournamentFinishedSort.finishedRecentlyFirst' },
    1: { id: 'app.enums.tournamentFinishedSort.finishedRecentlyLast' },
  }),
);

export const gameTypeEnum = {
  SINGLE_PLAYER: 1,
  TWO_PLAYER: 2,
  MULTIPLAYER: 3,
};

gameTypeEnum.helpers = createEnum(
  gameTypeEnum,
  defineMessages({
    1: { id: 'app.enums.gameType.singlePlayer' },
    2: { id: 'app.enums.gameType.twoPlayer' },
    3: { id: 'app.enums.gameType.multiplayer' },
  }),
);

export const tournamentMatchLogVisibility = {
  PUBLIC: 1,
  PRIVATE: 2,
};

tournamentMatchLogVisibility.helpers = createEnum(
  tournamentMatchLogVisibility,
  defineMessages({
    1: { id: 'app.enums.tournamentMatchLogVisibility.public' },
    2: { id: 'app.enums.tournamentMatchLogVisibility.private' },
  }),
);

export const userRoleEnum = {
  USER: 1,
  ORGANIZER: 2,
  ADMIN: 3,
};

userRoleEnum.helpers = createEnum(
  userRoleEnum,
  defineMessages({
    1: { id: 'app.enums.userRole.user' },
    2: { id: 'app.enums.userRole.organizer' },
    3: { id: 'app.enums.userRole.admin' },
  }),
);

export const emailNotificationsEnum = {
  ON: 1,
  OFF: 2,
};

emailNotificationsEnum.helpers = createEnum(
  emailNotificationsEnum,
  defineMessages({
    1: { id: 'app.enums.emailNotifications.on' },
    2: { id: 'app.enums.emailNotifications.off' },
  }),
);
