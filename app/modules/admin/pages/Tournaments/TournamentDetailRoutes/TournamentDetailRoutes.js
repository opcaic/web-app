import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentBasicInfo from '@/modules/admin/containers/Tournament/TournamentBasicInfo/TournamentBasicInfo';
import TournamentDocumentList from '@/modules/admin/containers/Tournament/TournamentDocumentList/TournamentDocumentList';
import TournamentDocumentNew from '@/modules/admin/containers/Tournament/TournamentDocumentNew/TournamentDocumentNew';
import TournamentDocumentDetail from '@/modules/admin/containers/Tournament/TournamentDocumentDetail/TournamentDocumentDetail';
import TournamentParticipantList from '@/modules/admin/containers/Tournament/TournamentParticipantList/TournamentParticipantList';
import TournamentParticipantNew from '@/modules/admin/containers/Tournament/TournamentParticipantNew/TournamentParticipantNew';
import TournamentMatchList from '@/modules/admin/containers/Tournament/TournamentMatchList';
import TournamentMatchDetail from '@/modules/admin/containers/Tournament/TournamentMatchDetail';
import TournamentLeaderboard from '@/modules/admin/containers/Tournament/TournamentLeaderboard';

const MenuSyncedBasicInfo = withMenuSync(TournamentBasicInfo, {
  tournamentMenu: ['basic_info'],
});

const MenuSyncedDocumentList = withMenuSync(TournamentDocumentList, {
  tournamentMenu: ['documents'],
});

const MenuSyncedDocumentNew = withMenuSync(TournamentDocumentNew, {
  tournamentMenu: ['documents'],
});

const MenuSyncedDocumentDetail = withMenuSync(TournamentDocumentDetail, {
  tournamentMenu: ['documents'],
});

const MenuSyncedParticipants = withMenuSync(TournamentParticipantList, {
  tournamentMenu: ['participants'],
});

const MenuSyncedParticipantNew = withMenuSync(TournamentParticipantNew, {
  tournamentMenu: ['participants'],
});

const MenuSyncedMatchList = withMenuSync(TournamentMatchList, {
  tournamentMenu: ['matches'],
});

const MenuSyncedMatchDetail = withMenuSync(TournamentMatchDetail, {
  tournamentMenu: ['matches'],
});

const MenuSyncedLeaderboard = withMenuSync(TournamentLeaderboard, {
  tournamentMenu: ['leaderboard'],
});

const TournamentDetailRoutes = ({ tournament }) => (
  <Switch>
    <Route
      exact
      path="/admin/tournaments/:id"
      render={() => <MenuSyncedBasicInfo tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/documents"
      render={() => <MenuSyncedDocumentList tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/documents/new"
      render={() => <MenuSyncedDocumentNew tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/documents/:documentId"
      render={() => <MenuSyncedDocumentDetail tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/participants"
      render={() => <MenuSyncedParticipants tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/participants/new"
      render={() => <MenuSyncedParticipantNew tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/matches"
      render={() => <MenuSyncedMatchList tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/matches/:matchId"
      render={() => <MenuSyncedMatchDetail tournament={tournament} />}
    />
    <Route
      exact
      path="/admin/tournaments/:id/leaderboard"
      render={() => <MenuSyncedLeaderboard tournament={tournament} />}
    />
  </Switch>
);

TournamentDetailRoutes.propTypes = {
  tournament: PropTypes.object,
};

export default TournamentDetailRoutes;
