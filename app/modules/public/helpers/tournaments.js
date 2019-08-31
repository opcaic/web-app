import {
  tournamentAvailabilityEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';

export function transformTournamentForList(tournamentOld) {
  const tournamentNew = Object.assign({}, tournamentOld);

  tournamentNew.footerTags = [];

  tournamentNew.footerTags.push(
    tournamentScopeEnum.helpers.idToText(tournamentNew.scope).toLowerCase(),
  );

  if (tournamentNew.availability === tournamentAvailabilityEnum.PRIVATE) {
    tournamentNew.footerTags.push(
      tournamentAvailabilityEnum.helpers
        .idToText(tournamentNew.availability)
        .toLowerCase(),
    );
  }

  return tournamentNew;
}
