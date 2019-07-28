import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={250}>
    <Link to="/admin">
      <div
        className="logo"
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
        }}
      />
    </Link>
    <Menu
      mode="inline"
      theme="dark"
      style={{ height: '100%', borderRight: 0 }}
      selectedKeys={['system']}
    >
      <Menu.Item key="dashboard">
        <Link to="/admin">
          <FormattedMessage id="app.admin.sidebar.dashboard" />
        </Link>
      </Menu.Item>
      <Menu.Item key="tournaments_list">
        <Link to="/admin/tournaments">
          <FormattedMessage id="app.admin.sidebar.tournaments" />
        </Link>
      </Menu.Item>
      <Menu.Item key="games_list">
        <Link to="/admin/games">
          <FormattedMessage id="app.admin.sidebar.games" />
        </Link>
      </Menu.Item>
      <Menu.Item key="users_list">
        <Link to="/admin/users">
          <FormattedMessage id="app.admin.sidebar.users" />
        </Link>
      </Menu.Item>
      <Menu.Item key="system">
        <Link to="/admin/system">
          <FormattedMessage id="app.admin.sidebar.system" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="public">
        <Link to="/">
          <FormattedMessage id="app.admin.sidebar.backToPublic" />
        </Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
