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

const TournamentDetailRoutes = ({ tournament }) => (
  <Switch>
    <Route
      exact
      path="/admin/tournaments/:id"
      render={() => <MenuSyncedBasicInfo resource={tournament} />}
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
  </Switch>
);

TournamentDetailRoutes.propTypes = {
  tournament: PropTypes.object,
};

export default TournamentDetailRoutes;
