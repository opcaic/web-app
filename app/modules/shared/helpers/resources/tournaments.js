import {
  tournamentSimplifiedStateEnum,
  tournamentSortEnum,
  tournamentStateEnum,
} from '@/modules/shared/helpers/enumHelpers';

export function getFilterParams(selectedValues) {
  const params = Object.assign({}, selectedValues);

  switch (params.sortBy) {
    case tournamentSortEnum.DEADLINE_SOON_FIRST:
      params.sortBy = 'deadline';
      params.asc = true;
      break;
    case tournamentSortEnum.DEADLINE_LATE_FIRST:
      params.sortBy = 'deadline';
      params.asc = false;
      break;

    default:
      break;
  }

  switch (params.state) {
    case tournamentSimplifiedStateEnum.RUNNING:
      params.acceptsSubmission = true;
      break;

    case tournamentSimplifiedStateEnum.FINISHED:
      params.acceptsSubmission = false;
      break;

    default:
      break;
  }

  params.state = tournamentStateEnum.helpers
    .getValues()
    .map(x => x.id)
    .filter(x => x !== tournamentStateEnum.CREATED);

  return params;
}
