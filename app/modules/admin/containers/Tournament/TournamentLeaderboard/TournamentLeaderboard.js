import React from 'react';
import Leaderboard from '@/modules/shared/components/Tournament/Leaderboard';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  actions as leaderboardActions,
  selectors as leaderboardSelectors,
} from '@/modules/admin/ducks/leaderboards';
import { createStructuredSelector } from 'reselect';
import { getLeaderboardData } from '@/modules/shared/helpers/resources/leaderboards';
import ProgressVisualization from '@/modules/shared/components/Tournament/ProgressVisualization';

/* eslint-disable react/prefer-stateless-function */
export class TournamentLeaderboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchItems(this.props.tournament.id);
  }

  render() {
    return (
      <div>
        {this.props.resource && (
          <div style={{ marginBottom: 25 }}>
            <ProgressVisualization
              leaderboard={this.props.resource}
              tournament={this.props.tournament}
            />
          </div>
        )}

        <Leaderboard
          leaderboard={this.props.resource}
          dataSource={getLeaderboardData(this.props.resource)}
          loading={this.props.isFetching}
        />
      </div>
    );
  }
}

TournamentLeaderboard.propTypes = {
  tournament: PropTypes.object,
  resource: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId =>
      dispatch(leaderboardActions.fetchResource(tournamentId)),
  };
}

const mapStateToProps = createStructuredSelector({
  resource: leaderboardSelectors.getItem,
  isFetching: leaderboardSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentLeaderboard);
