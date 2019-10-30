import TournamentForm from '@/modules/admin/components/Tournament/TournamentForm';
import TournamentStats from '@/modules/admin/components/Tournament/TournamentStats';
import TournamentActionButtons from '@/modules/admin/containers/Tournament/TournamentActionButtons';
import {
  selectors as documentSelectors,
  actions as documentActions,
} from '@/modules/admin/ducks/documents';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import { actions as tournamentsActions } from '@/modules/admin/ducks/tournaments';
import Spin from '@/modules/shared/components/Spin';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TournamentFilesUpload from '../TournamentFilesUpload';
import {
  uploadTournamentFiles,
  downloadTournamentFiles,
  hideTournamentFilesModal,
  showTournamentFilesModal,
  tournamentFilesUploadVisibleSelector,
} from '@/modules/admin/ducks/tournamentFiles';

/* eslint-disable react/prefer-stateless-function */
class TournamentBasicInfo extends React.PureComponent {
  state = {
    resource: this.props.tournament,
    hasAdditionalFiles: this.props.tournament.hasAdditionalFiles,
  };

  componentWillMount() {
    this.props.fetchGame(this.props.tournament.game.id);
  }

  componentDidMount() {
    this.props.fetchGames();

    if (this.props.tournament) {
      this.props.fetchDocuments(this.props.tournament.id);
    }
  }

  changeState = (newState, stateAction) => {
    const newStateObject = { state: newState };

    this.setState(state => ({
      resource: Object.assign({}, state.resource, newStateObject),
    }));

    this.props.changeState(stateAction);
  };

  reloadResource = () => {
    this.props.fetchResource(this.props.tournament.id);
  };

  handleUploadSuccess = () => {
    this.setState({ hasAdditionalFiles: true });
  };

  render() {
    return (
      <Spin
        spinning={this.props.isFetchingGames || this.props.isFetchingDocuments}
      >
        <Row style={{ marginBottom: 20 }}>
          <Col xl={16}>
            <TournamentStats resource={this.state.resource} />
          </Col>
          <Col xl={8} style={{ textAlign: 'right' }}>
            <TournamentActionButtons
              resource={this.state.resource}
              handleClick={this.changeState}
              failureCallback={this.reloadResource}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TournamentForm
              resource={this.state.resource || {}}
              games={this.props.games}
              documents={this.props.documents}
              onSubmit={(values, successCallback, failureCallback) =>
                this.props.updateResource(
                  Object.assign({}, this.state.resource, values),
                  successCallback,
                  failureCallback,
                )
              }
              showTournamentFilesModal={this.props.showModal}
              downloadTournamentFiles={this.props.downloadTournamentFiles}
              hasAdditionalFiles={this.state.hasAdditionalFiles}
            />
            <TournamentFilesUpload
              additionalSuccessCallback={this.handleUploadSuccess}
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

TournamentBasicInfo.propTypes = {
  tournament: PropTypes.object,
  fetchResource: PropTypes.func.isRequired,
  updateResource: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
  fetchGame: PropTypes.func,
  fetchDocuments: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  isFetchingDocuments: PropTypes.bool.isRequired,
  changeState: PropTypes.func.isRequired,
  downloadTournamentFiles: PropTypes.func,
  showModal: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(tournamentsActions.fetchResource(id)),
    updateResource: (resource, successCallback, failureCallback) =>
      dispatch(
        tournamentsActions.updateResource(resource.id, resource, {
          meta: {
            successCallback,
            failureCallback,
          },
        }),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
        }),
      ),
    fetchGame: id => dispatch(gameActions.fetchResource(id)),
    fetchDocuments: tournamentId =>
      dispatch(
        documentActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
          tournamentId,
        }),
      ),
    changeState: action => dispatch(action),
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
    showModal: tournament => dispatch(showTournamentFilesModal(tournament)),
    downloadTournamentFiles: tournamentId =>
      dispatch(downloadTournamentFiles(tournamentId)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
  isFetchingDocuments: documentSelectors.isFetching,
  documents: documentSelectors.getItems,
  visible: tournamentFilesUploadVisibleSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentBasicInfo);
