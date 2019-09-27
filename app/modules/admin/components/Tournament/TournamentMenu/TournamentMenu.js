import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

const TournamentMenu = ({ activeItems, id }) => (
  <Menu mode="horizontal" selectedKeys={activeItems}>
    <Menu.Item key="basic_info">
      <Link to={`/admin/tournaments/${id}`}>
        <FormattedMessage id="app.admin.tournamentMenu.basicInfo" />
      </Link>
    </Menu.Item>
    <Menu.Item key="documents">
      <Link to={`/admin/tournaments/${id}/documents`}>
        <FormattedMessage id="app.admin.tournamentMenu.documents" />
      </Link>
    </Menu.Item>
    <Menu.Item key="participants">
      <Link to={`/admin/tournaments/${id}/participants`}>
        <FormattedMessage id="app.admin.tournamentMenu.participants" />
      </Link>
    </Menu.Item>
    <Menu.Item key="matches">
      <Link to={`/admin/tournaments/${id}/matches`}>
        <FormattedMessage id="app.admin.tournamentMenu.matches" />
      </Link>
    </Menu.Item>
    <Menu.Item key="submissions">
      <Link to={`/admin/tournaments/${id}/submissions`}>
        <FormattedMessage id="app.admin.tournamentMenu.submissions" />
      </Link>
    </Menu.Item>
    <Menu.Item key="leaderboard">
      <Link to={`/admin/tournaments/${id}/leaderboard`}>
        <FormattedMessage id="app.admin.tournamentMenu.leaderboard" />
      </Link>
    </Menu.Item>
  </Menu>
);

TournamentMenu.propTypes = {
  activeItems: PropTypes.array,
  id: PropTypes.string.isRequired,
};

export default TournamentMenu;
