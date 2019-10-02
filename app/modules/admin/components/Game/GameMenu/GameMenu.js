import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import { FormattedMessage } from 'react-intl';

const GameMenu = ({ activeItems, id }) => (
  <Menu mode="horizontal" selectedKeys={activeItems}>
    <Menu.Item key="basic_info">
      <Link to={`/admin/games/${id}`}>
        <FormattedMessage id="app.admin.gameMenu.basicInfo" />
      </Link>
    </Menu.Item>
    <Menu.Item key="configuration">
      <Link to={`/admin/games/${id}/configuration`}>
        <FormattedMessage id="app.admin.gameMenu.configuration" />
      </Link>
    </Menu.Item>
  </Menu>
);

GameMenu.propTypes = {
  activeItems: PropTypes.array,
  id: PropTypes.string.isRequired,
};

export default GameMenu;
