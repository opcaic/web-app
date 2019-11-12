import { FormattedMessage } from 'react-intl';
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import PropTypes from 'prop-types';

const DrawerLeftMenu = ({ activeItems, isLoggedIn }) => (
  <Menu mode="inline" selectedKeys={activeItems}>
    <Menu.Item key="home">
      <Link to="/">
        <FormattedMessage id="app.public.topMenu.home" />
      </Link>
    </Menu.Item>
    <Menu.Item key="tournaments">
      <Link to="/tournaments">
        <FormattedMessage id="app.public.topMenu.tournaments" />
      </Link>
    </Menu.Item>
    <Menu.Item key="games">
      <Link to="/games">
        <FormattedMessage id="app.public.topMenu.games" />
      </Link>
    </Menu.Item>

    {isLoggedIn && [
      <Menu.Item key="administration">
        <Link to="/admin">
          <FormattedMessage id="app.public.topMenu.administration" />
        </Link>
      </Menu.Item>,
    ]}
  </Menu>
);

DrawerLeftMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  activeItems: PropTypes.array,
};

export default DrawerLeftMenu;
