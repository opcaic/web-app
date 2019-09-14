import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import SubmissionUploadComponent from '@/modules/shared/components/Tournament/SubmissionUpload';
import {
  hideSubmissionModal,
  uploadSubmission,
} from '@/modules/shared/ducks/submission';
import { createStructuredSelector } from 'reselect';
import {
  submissionUploadTournamentSelector,
  submissionUploadVisibleSelector,
} from '@/modules/shared/selectors/submissionUpload';

// eslint-disable-next-line react/prefer-stateless-function
class SubmissionUpload extends Component {
  render() {
    return (
      <SubmissionUploadComponent
        visible={this.props.visible}
        hideModal={this.props.hideModal}
        tournament={this.props.tournament}
        onUpload={(fileList, tournamentId, successCallback, failureCallback) =>
          this.props.uploadSubmission(
            fileList,
            tournamentId,
            successCallback,
            failureCallback,
          )
        }
      />
    );
  }
}

SubmissionUpload.propTypes = {
  uploadSubmission: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  tournament: PropTypes.object,
  visible: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    uploadSubmission: (
      fileList,
      tournamentId,
      successCallback,
      failureCallback,
    ) =>
      dispatch(
        uploadSubmission(
          fileList,
          tournamentId,
          successCallback,
          failureCallback,
        ),
      ),
    hideModal: () => dispatch(hideSubmissionModal()),
  };
}

const mapStateToProps = createStructuredSelector({
  visible: submissionUploadVisibleSelector,
  tournament: submissionUploadTournamentSelector,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmissionUpload);
