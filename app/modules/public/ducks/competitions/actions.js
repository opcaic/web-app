import { FETCH_COMPETITIONS } from './constants';
import { createApiAction } from '@/modules/shared/helpers/apiMiddleware';

// export function fetchCompetitionsRequest() {
//   return {
//     type: FETCH_COMPETITIONS_REQUEST,
//   };
// }
export function fetchCompetitionsRequest() {
  return createApiAction({
    type: FETCH_COMPETITIONS,
    endpoint: '/api/tournaments',
    method: 'GET',
  });
}
