import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import FileUploadModal from '@/modules/admin/components/Tournament/TournamentFilesUploadModal';
import {
  hideTournamentFilesModal,
  uploadTournamentFiles,
  tournamentFilesUploadVisibleSelector,
  tournamentFilesUploadTournamentSelector,
} from '@/modules/admin/ducks/tournamentFiles';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const TournamentFilesUpload = props => (
  <FileUploadModal
    visible={props.visible}
    hideModal={props.hideModal}
    tournament={props.tournament}
    location={props.location}
    onUpload={props.uploadTournamentFiles}
    additionalSuccessCallback={props.additionalSuccessCallback}
    maxFilesSize={props.game && props.game.maxAdditionalFilesSize}
  />
);

TournamentFilesUpload.propTypes = {
  uploadTournamentFiles: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  tournament: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  location: PropTypes.object,
  additionalSuccessCallback: PropTypes.func,
  game: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    uploadTournamentFiles: (
      fileList,
      tournamentId,
      maxSubmissionSize,
      successCallback,
      failureCallback,
      progressCallback,
    ) =>
      dispatch(
        uploadTournamentFiles(
          fileList,
          tournamentId,
          maxSubmissionSize,
          successCallback,
          failureCallback,
          progressCallback,
        ),
      ),
    hideModal: () => dispatch(hideTournamentFilesModal()),
    fetchGame: id => dispatch(gameActions.fetchResoure(id)),
  };
}

const mapStateToProps = createStructuredSelector({
  visible: tournamentFilesUploadVisibleSelector,
  tournament: tournamentFilesUploadTournamentSelector,
  game: gameSelectors.getItem,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(TournamentFilesUpload);
