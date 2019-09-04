import React from 'react';
import PageContent from '../../../components/Tournament/PageContent';
import Leaderboard from '@/modules/public/components/Tournament/Leaderboard';
import { leaderboard } from '@/modules/public/ducks/tournaments';

/* eslint-disable react/prefer-stateless-function */
class TournamentLeaderboard extends React.PureComponent {
  render() {
    return (
      <PageContent title="Leaderboard" withPadding={false}>
        <Leaderboard dataSource={leaderboard} type="singleplayer" />
      </PageContent>
    );
  }
}

TournamentLeaderboard.propTypes = {};

export default TournamentLeaderboard;
