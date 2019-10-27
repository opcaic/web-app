import {
  tournamentSimplifiedStateEnum,
  tournamentRunningSortEnum,
  tournamentStateEnum,
  tournamentFinishedSortEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';

export function getFilterParams(selectedValues) {
  const params = Object.assign({}, selectedValues);

  if (params.state === tournamentSimplifiedStateEnum.RUNNING) {
    params.acceptsSubmission = true;

    switch (params.sortByRunning) {
      case tournamentRunningSortEnum.DEADLINE_SOON_FIRST:
        params.sortBy = 'deadline';
        params.asc = true;
        break;
      case tournamentRunningSortEnum.DEADLINE_SOON_LAST:
        params.sortBy = 'deadline';
        params.asc = false;
        break;

      default:
        break;
    }
  } else {
    params.acceptsSubmission = false;

    switch (params.sortByFinished) {
      case tournamentFinishedSortEnum.FINISHED_RECENTLY_FIRST:
        params.sortBy = 'finished';
        params.asc = false;
        break;
      case tournamentFinishedSortEnum.FINISHED_RECENTLY_LAST:
        params.sortBy = 'finished';
        params.asc = true;
        break;

      default:
        break;
    }
  }

  params.state = tournamentStateEnum.helpers
    .getValues()
    .map(x => x.id)
    .filter(x => x !== tournamentStateEnum.CREATED);

  return params;
}

export function acceptsSubmissions(tournament) {
  return (
    (tournament.scope === tournamentScopeEnum.ONGOING &&
      tournament.state === tournamentStateEnum.RUNNING) ||
    (tournament.scope === tournamentScopeEnum.DEADLINE &&
      tournament.state === tournamentStateEnum.PUBLISHED)
  );
}

export function getSimplifiedState(tournament) {
  if (tournament.scope === tournamentScopeEnum.DEADLINE) {
    switch (tournament.state) {
      case tournamentStateEnum.PUBLISHED:
        return tournamentSimplifiedStateEnum.RUNNING;
      case tournamentStateEnum.RUNNING:
      case tournamentStateEnum.WAITING_FOR_FINISH:
        return tournamentSimplifiedStateEnum.EVALUATING;
      case tournamentStateEnum.PAUSED:
        return tournamentSimplifiedStateEnum.PAUSED;
      case tournamentStateEnum.FINISHED:
        return tournamentSimplifiedStateEnum.FINISHED;
      default:
        return tournamentSimplifiedStateEnum.RUNNING;
    }
  } else {
    switch (tournament.state) {
      case tournamentStateEnum.PUBLISHED:
      case tournamentStateEnum.RUNNING:
        return tournamentSimplifiedStateEnum.RUNNING;
      case tournamentStateEnum.WAITING_FOR_FINISH:
        return tournamentSimplifiedStateEnum.EVALUATING;
      case tournamentStateEnum.PAUSED:
        return tournamentSimplifiedStateEnum.PAUSED;
      case tournamentStateEnum.FINISHED:
        return tournamentSimplifiedStateEnum.FINISHED;
      default:
        return tournamentSimplifiedStateEnum.RUNNING;
    }
  }
}
