import { createSelector } from 'reselect';

const getSubmissionUpload = state => state.get('submissionUpload');

export const submissionUploadVisibleSelector = createSelector(
  getSubmissionUpload,
  auth => auth.get('visible'),
);

export const submissionUploadTournamentSelector = createSelector(
  getSubmissionUpload,
  auth => auth.get('tournament'),
);
