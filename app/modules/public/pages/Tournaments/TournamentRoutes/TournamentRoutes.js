import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentLeaderboard from '@/modules/public/containers/Tournament/TournamentLeaderboard';
import TournamentOverview from '@/modules/public/containers/Tournament/TournamentOverview';
import TournamentMatches from '@/modules/public/containers/Tournament/TournamentMatchList';
import TournamentSubmissions from '@/modules/public/containers/Tournament/TournamentSubmissionList';
import TournamentMatchDetail from '@/modules/public/containers/Tournament/TournamentMatchDetail';
import TournamentSubmissionDetail from '@/modules/public/containers/Tournament/TournamentSubmissionDetail';

const MenuSyncedTournamentOverview = withMenuSync(TournamentOverview, {
  tournamentMenu: ['overview'],
});

const MenuSyncedTournamentLeaderboard = withMenuSync(TournamentLeaderboard, {
  tournamentMenu: ['leaderboard'],
});

const MenuSyncedTournamentMatches = withMenuSync(TournamentMatches, {
  tournamentMenu: ['matches'],
});

const MenuSyncedTournamentMatchDetail = withMenuSync(TournamentMatchDetail, {
  tournamentMenu: ['matches'],
});

const MenuSyncedTournamentSubmissions = withMenuSync(TournamentSubmissions, {
  tournamentMenu: ['submissions'],
});

const MenuSyncedTournamentSubmissionDetail = withMenuSync(
  TournamentSubmissionDetail,
  {
    tournamentMenu: ['submissions'],
  },
);

const TournamentRoutes = ({ tournament }) => (
  <Switch>
    <Route
      exact
      path="/tournaments/:id/"
      component={() => <MenuSyncedTournamentOverview tournament={tournament} />}
    />
    <Route
      exact
      path="/tournaments/:id/leaderboard"
      component={() => (
        <MenuSyncedTournamentLeaderboard tournament={tournament} />
      )}
    />

    <Route
      exact
      path="/tournaments/:id/matches"
      component={() => <MenuSyncedTournamentMatches tournament={tournament} />}
    />
    <Route
      exact
      path="/tournaments/:id/matches/:matchId"
      component={() => (
        <MenuSyncedTournamentMatchDetail tournament={tournament} />
      )}
    />

    <Route
      exact
      path="/tournaments/:id/submissions"
      component={() => (
        <MenuSyncedTournamentSubmissions tournament={tournament} />
      )}
    />
    <Route
      exact
      path="/tournaments/:id/submissions/:submissionId"
      component={() => (
        <MenuSyncedTournamentSubmissionDetail tournament={tournament} />
      )}
    />
  </Switch>
);

TournamentRoutes.propTypes = {
  tournament: PropTypes.object,
};

export default TournamentRoutes;
