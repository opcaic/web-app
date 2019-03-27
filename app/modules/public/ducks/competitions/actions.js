import {
  FETCH_COMPETITIONS_REQUEST,
  FETCH_COMPETITIONS_SUCCESS,
} from './constants';

export function fetchCompetitionsRequest() {
  return {
    type: FETCH_COMPETITIONS_REQUEST,
  };
}

export function fetchCompetitionsSuccess(competitions) {
  return {
    type: FETCH_COMPETITIONS_SUCCESS,
    payload: {
      competitions,
    },
  };
}
