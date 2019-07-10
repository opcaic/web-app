import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const TopMenu = () => (
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
        <Menu.Item key="3">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    </div>
  </Header>
);

export default TopMenu;
