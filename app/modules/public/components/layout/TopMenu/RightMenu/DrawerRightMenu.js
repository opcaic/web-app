/* eslint-disable indent */
import { FormattedMessage } from 'react-intl';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DrawerRightMenu = ({ isLoggedIn, logout, changeLocale }) => (
  <div>
    <Menu mode="inline">
      <Menu.SubMenu
        key="language_sub"
        title={
          <span>
            <FormattedMessage id="app.public.topMenu.language" />
          </span>
        }
        style={{ marginBottom: 8 }}
      >
        <Menu.Item key="english" onClick={() => changeLocale('en')}>
          <FormattedMessage id="app.public.topMenu.english" />
        </Menu.Item>
        <Menu.Item key="czech" onClick={() => changeLocale('cs')}>
          <FormattedMessage id="app.public.topMenu.czech" />
        </Menu.Item>
      </Menu.SubMenu>
      {isLoggedIn
        ? [
            <Menu.Item key="account">
              <Link to="/settings/profile">
                <FormattedMessage id="app.public.topMenu.settings" />
              </Link>
            </Menu.Item>,
            <Menu.Item key="logout" onClick={() => logout()}>
              <FormattedMessage id="app.public.topMenu.logout" />
            </Menu.Item>,
          ]
        : [
            <Menu.Item key="login">
              <Link to="/login">
                <FormattedMessage id="app.public.topMenu.login" />
              </Link>
            </Menu.Item>,
            <Menu.Item key="register">
              <Link to="/register">
                <FormattedMessage id="app.public.topMenu.register" />
              </Link>
            </Menu.Item>,
          ]}
    </Menu>
  </div>
);

DrawerRightMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default DrawerRightMenu;
