import React from 'react';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import TournamentOverviewComponent from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview';
import {
  actions as documentActions,
  selectors as documentSelectors,
} from '@/modules/public/ducks/documents';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Spin from '@/modules/shared/components/Spin';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import {
  actions as leaderboardActions,
  selectors as leaderboardSelectors,
} from '@/modules/public/ducks/leaderboards';

/* eslint-disable react/prefer-stateless-function */
export class TournamentOverview extends React.PureComponent {
  componentDidMount() {
    this.props.fetchDocuments(this.props.tournament.id);
    this.props.fetchLeaderboard(this.props.tournament.id);
  }

  render() {
    return (
      <div>
        <TournamentPageTitle tournament={this.props.tournament} />

        <Spin
          spinning={
            this.props.isFetchingDocuments || this.props.isFetchingLeaderboard
          }
        >
          <TournamentOverviewComponent
            tournament={this.props.tournament}
            documents={this.props.documents}
            leaderboard={this.props.leaderboard}
          />
        </Spin>
      </div>
    );
  }
}

TournamentOverview.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
  documents: PropTypes.arrayOf(PropTypes.object),
  isFetchingDocuments: PropTypes.bool.isRequired,
  fetchDocuments: PropTypes.func.isRequired,
  leaderboard: PropTypes.object,
  fetchLeaderboard: PropTypes.func.isRequired,
  isFetchingLeaderboard: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchDocuments: tournamentId =>
      dispatch(
        documentActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
          tournamentId,
        }),
      ),
    fetchLeaderboard: tournamentId =>
      dispatch(leaderboardActions.fetchResource(tournamentId)),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetchingDocuments: documentSelectors.isFetching,
  documents: documentSelectors.getItems,
  leaderboard: leaderboardSelectors.getItem,
  isFetchingLeaderboard: leaderboardSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentOverview);
