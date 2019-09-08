import React from 'react';
import PageContent from '../../../components/Tournament/PageContent';
import Leaderboard from '@/modules/public/components/Tournament/Leaderboard';
import { leaderboard } from '@/modules/public/ducks/tournaments';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/propTypes';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/pageTitles';

/* eslint-disable react/prefer-stateless-function */
class TournamentLeaderboard extends React.PureComponent {
  render() {
    return (
      <PageContent title="Leaderboard" withPadding={false}>
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailLeaderboardPage,
          )}
        />
        <Leaderboard dataSource={leaderboard} type="singleplayer" />
      </PageContent>
    );
  }
}

TournamentLeaderboard.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
};

export default TournamentLeaderboard;
