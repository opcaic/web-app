/* eslint-disable prettier/prettier */
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Header } = Layout;

const TopMenu = ({ changeLocale, isLoggedIn, logout }) => (
  <Header style={{ background: '#3949AB' }}>
    <div className="container" style={{ padding: 0 }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', background: '#3949AB' }}
      >
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/competitions">Competitions</Link>
        </Menu.Item>

        {isLoggedIn
          ? [
            <Menu.Item key="3">
              <Link to="/admin">Administration</Link>
            </Menu.Item>,
            <Menu.Item key="4" onClick={() => logout()}>
                Logout
            </Menu.Item>,
          ]
          : [
            <Menu.Item key="3">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="4">
              <Link to="/register">Register</Link>
            </Menu.Item>,
          ]}

        <Menu.Item key="6" onClick={() => changeLocale('en')}>
          English
        </Menu.Item>
        <Menu.Item key="7" onClick={() => changeLocale('cs')}>
          Česky
        </Menu.Item>
      </Menu>
    </div>
  </Header>
);

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default TopMenu;
