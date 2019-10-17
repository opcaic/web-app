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
import { isLoggedIn } from '@/modules/shared/selectors/auth';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

// eslint-disable-next-line react/prefer-stateless-function
class SubmissionUpload extends Component {
  render() {
    return (
      <SubmissionUploadComponent
        visible={this.props.visible}
        hideModal={this.props.hideModal}
        tournament={this.props.tournament}
        isLoggedIn={this.props.isLoggedIn}
        location={this.props.location}
        onUpload={this.props.uploadSubmission}
      />
    );
  }
}

SubmissionUpload.propTypes = {
  uploadSubmission: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired,
  tournament: PropTypes.object,
  visible: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    uploadSubmission: (
      fileList,
      tournamentId,
      maxSubmissionSize,
      successCallback,
      failureCallback,
      progressCallback,
    ) =>
      dispatch(
        uploadSubmission(
          fileList,
          tournamentId,
          maxSubmissionSize,
          successCallback,
          failureCallback,
          progressCallback,
        ),
      ),
    hideModal: () => dispatch(hideSubmissionModal()),
  };
}

const mapStateToProps = createStructuredSelector({
  visible: submissionUploadVisibleSelector,
  tournament: submissionUploadTournamentSelector,
  isLoggedIn,
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SubmissionUpload);
