import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import withMenuSync from '@/modules/shared/helpers/hocs/withMenuSync';
import GameBasicInfo from '@/modules/admin/containers/Games/GameBasicInfo';
import GameConfiguration from '@/modules/admin/containers/Games/GameConfiguration';

const MenuSyncedBasicInfo = withMenuSync(GameBasicInfo, {
  gameMenu: ['basic_info'],
});

const MenuSyncedGameConfiguration = withMenuSync(GameConfiguration, {
  gameMenu: ['configuration'],
});

const TournamentDetailRoutes = ({ resource }) => (
  <Switch>
    <Route
      exact
      path="/admin/games/:id"
      render={() => <MenuSyncedBasicInfo resource={resource} />}
    />
    <Route
      exact
      path="/admin/games/:id/configuration"
      render={() => <MenuSyncedGameConfiguration resource={resource} />}
    />
  </Switch>
);

TournamentDetailRoutes.propTypes = {
  resource: PropTypes.object,
};

export default TournamentDetailRoutes;
