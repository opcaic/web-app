import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentLeaderboard from '@/modules/public/containers/Tournament/TournamentLeaderboard';
import TournamentOverview from '@/modules/public/containers/Tournament/TournamentOverview';
import TournamentMatchList from '@/modules/public/containers/Tournament/TournamentMatchList';
import TournamentSubmissions from '@/modules/public/containers/Tournament/TournamentSubmissionList';
import TournamentMatchDetail from '@/modules/public/containers/Tournament/TournamentMatchDetail';
import TournamentSubmissionDetail from '@/modules/public/containers/Tournament/TournamentSubmissionDetail';
import TournamentMatchListMy from '@/modules/public/containers/Tournament/TournamentMatchListMy';
import PrivateRoute from '@/modules/shared/containers/PrivateRoute/PrivateRoute';
import TournamentContentNotFound from '@/modules/public/components/Tournament/TournamentDetail/TournamentContentNotFound';

const MenuSyncedTournamentOverview = withMenuSync(TournamentOverview, {
  tournamentMenu: ['overview'],
});

const MenuSyncedTournamentLeaderboard = withMenuSync(TournamentLeaderboard, {
  tournamentMenu: ['leaderboard'],
});

const MenuSyncedTournamentMatches = withMenuSync(TournamentMatchList, {
  tournamentMenu: ['matches'],
});

const MenuSyncedTournamentMatchDetail = withMenuSync(TournamentMatchDetail, {
  tournamentMenu: ['matches'],
});

const MenuSyncedTournamentSubmissions = withMenuSync(TournamentSubmissions, {
  tournamentMenu: ['mySubmissions'],
});

const MenuSyncedTournamentSubmissionDetail = withMenuSync(
  TournamentSubmissionDetail,
  {
    tournamentMenu: ['mySubmissions'],
  },
);

const MenuSyncedTournamentMyMatches = withMenuSync(TournamentMatchListMy, {
  tournamentMenu: ['myMatches'],
});

const MenuSyncedTournamentMyMatchDetail = withMenuSync(TournamentMatchDetail, {
  tournamentMenu: ['myMatches'],
});

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

    <PrivateRoute
      exact
      path="/tournaments/:id/submissions"
      component={() => (
        <MenuSyncedTournamentSubmissions tournament={tournament} />
      )}
    />
    <PrivateRoute
      exact
      path="/tournaments/:id/submissions/:submissionId"
      component={() => (
        <MenuSyncedTournamentSubmissionDetail tournament={tournament} />
      )}
    />

    <PrivateRoute
      exact
      path="/tournaments/:id/my-matches"
      component={() => (
        <MenuSyncedTournamentMyMatches tournament={tournament} />
      )}
    />
    <PrivateRoute
      exact
      path="/tournaments/:id/my-matches/:matchId"
      component={() => (
        <MenuSyncedTournamentMyMatchDetail tournament={tournament} />
      )}
    />

    <Route
      path="/"
      component={() => <TournamentContentNotFound tournament={tournament} />}
    />
  </Switch>
);

TournamentRoutes.propTypes = {
  tournament: PropTypes.object,
};

export default TournamentRoutes;
