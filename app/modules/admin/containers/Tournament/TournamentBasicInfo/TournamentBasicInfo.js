import TournamentForm from '@/modules/admin/components/Tournament/TournamentForm';
import TournamentStats from '@/modules/admin/components/Tournament/TournamentStats';
import TournamentActionButtons from '@/modules/admin/containers/Tournament/TournamentActionButtons';
import {
  actions as documentActions,
  selectors as documentSelectors,
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

/* eslint-disable react/prefer-stateless-function */
class TournamentBasicInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      resource: this.props.tournament,
    };
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
            />
          </Col>
        </Row>
      </Spin>
    );
  }
}

TournamentBasicInfo.propTypes = {
  tournament: PropTypes.object,
  updateResource: PropTypes.func.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  isFetchingDocuments: PropTypes.bool.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  changeState: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
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
  };
}

const mapStateToProps = createStructuredSelector({
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
  isFetchingDocuments: documentSelectors.isFetching,
  documents: documentSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentBasicInfo);
