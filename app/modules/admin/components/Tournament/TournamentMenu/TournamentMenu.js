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
    <Menu.Item key="matches">
      <Link to={`/admin/tournaments/${id}/matches`}>
        <FormattedMessage id="app.admin.tournamentMenu.matches" />
      </Link>
    </Menu.Item>
  </Menu>
);

TournamentMenu.propTypes = {
  activeItems: PropTypes.array,
  id: PropTypes.string.isRequired,
};

export default TournamentMenu;
