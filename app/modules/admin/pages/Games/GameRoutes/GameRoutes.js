import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import GameListPage from '@/modules/admin/pages/Games/GameListPage/GameListPage';
import GameNewPage from '@/modules/admin/pages/Games/GameNewPage/GameNewPage';
import GameDetailPage from '@/modules/admin/pages/Games/GameDetailPage/GameDetailPage';

const GameRoutes = () => (
  <Switch>
    <Route
      exact
      path="/admin/games/"
      component={withMenuSync(GameListPage, {
        adminSidebar: ['games_list'],
      })}
    />
    <Route
      exact
      path="/admin/games/new"
      component={withMenuSync(GameNewPage, {
        adminSidebar: ['games_list'],
      })}
    />
    <Route
      exact
      path="/admin/games/:id"
      component={withMenuSync(GameDetailPage, {
        adminSidebar: ['games_list'],
      })}
    />
  </Switch>
);

export default GameRoutes;
