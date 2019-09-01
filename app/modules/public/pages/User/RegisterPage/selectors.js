import { createSelector } from 'reselect';

const selectRegistrationState = state => state.get('registration');

const makeSelectRegistrationErrors = () =>
  createSelector(
    selectRegistrationState,
    registrationState => registrationState.toJS().errors, // TODO: improve
  );

export { makeSelectRegistrationErrors };
