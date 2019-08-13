import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import TournamentListPage from '@/modules/admin/pages/Tournaments/TournamentListPage/TournamentListPage';
import TournamentNewPage from '@/modules/admin/pages/Tournaments/TournamentNewPage/TournamentNewPage';
import TournamentDetailPage from '@/modules/admin/pages/Tournaments/TournamentDetailPage/TournamentDetailPage';

const TournamentRoutes = () => (
  <Switch>
    <Route
      exact
      path="/admin/tournaments/"
      component={withMenuSync(TournamentListPage, {
        adminSidebar: ['tournaments_list'],
      })}
    />
    <Route
      exact
      path="/admin/tournaments/new"
      component={withMenuSync(TournamentNewPage, {
        adminSidebar: ['tournaments_list'],
      })}
    />
    <Route
      exact
      path="/admin/tournaments/:id"
      component={withMenuSync(TournamentDetailPage, {
        adminSidebar: ['tournaments_list'],
      })}
    />
  </Switch>
);

export default TournamentRoutes;
