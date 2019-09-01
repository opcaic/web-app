import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentBasicInfo from '@/modules/admin/containers/Tournament/TournamentBasicInfo/TournamentBasicInfo';
import TournamentDocumentList from '@/modules/admin/containers/Tournament/TournamentDocumentList/TournamentDocumentList';
import TournamentDocumentNew from '@/modules/admin/containers/Tournament/TournamentDocumentNew/TournamentDocumentNew';
import TournamentDocumentDetail from '@/modules/admin/containers/Tournament/TournamentDocumentDetail/TournamentDocumentDetail';

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
  </Switch>
);

TournamentDetailRoutes.propTypes = {
  tournament: PropTypes.object,
};

export default TournamentDetailRoutes;