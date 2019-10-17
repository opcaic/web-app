import React from 'react';
import Leaderboard from '@/modules/shared/components/Tournament/Leaderboard';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  actions as leaderboardActions,
  selectors as leaderboardSelectors,
} from '@/modules/public/ducks/leaderboards';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PageContent from '@/modules/public/components/layout/PageContent';
import { getLeaderboardData } from '@/modules/shared/helpers/resources/leaderboards';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import ProgressVisualization from '@/modules/shared/components/Tournament/ProgressVisualization';

/* eslint-disable react/prefer-stateless-function */
export class TournamentLeaderboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchItems(this.props.tournament.id);
  }

  render() {
    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentLeaderboard.title" />}
        withPadding={false}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailLeaderboardPage,
          )}
        />

        {this.props.resource && (
          <div style={{ marginBottom: 25, marginLeft: 25, marginTop: 10 }}>
            <ProgressVisualization leaderboard={this.props.resource} />
          </div>
        )}

        <Leaderboard
          leaderboard={this.props.resource}
          dataSource={getLeaderboardData(this.props.resource)}
          loading={this.props.isFetching}
        />
      </PageContent>
    );
  }
}

TournamentLeaderboard.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
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
