import resourceFactory from '../../shared/helpers/resourceManager';

export const { actions, actionTypes, reducers, selectors } = resourceFactory({
  resourceName: 'tournamentParticipants',
  apiEndpointFactory: (id = '', endpointParams) =>
    `api/tournaments/${endpointParams.tournamentId}/participants/${id}`,
});

/*
 * Sagas
 */
export function* saga() {
  // TODO: if needed
}

export default reducers;
