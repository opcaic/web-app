/* eslint-disable prettier/prettier */
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';

const DrawerLeftMenu = ({ activeItems, isLoggedIn, currentUser }) => (
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

    {isLoggedIn &&
      currentUser.role >= userRoleEnum.ORGANIZER && [
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
  currentUser: PropTypes.object,
};

export default DrawerLeftMenu;
