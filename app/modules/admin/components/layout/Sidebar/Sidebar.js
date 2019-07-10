import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const Sidebar = () => (
  <Sider width={300} style={{ background: '#fff' }}>
    <Menu
      mode="inline"
      defaultSelectedKeys={['dashboard']}
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="dashboard">
        <Link to="/admin">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="tournaments_list">
        <Link to="/admin/tournaments">Tournaments</Link>
      </Menu.Item>
      <Menu.Item key="games_list">
        <Link to="/admin/games">Games</Link>
      </Menu.Item>
      <Menu.Item key="users_list">
        <Link to="/admin/users">Users</Link>
      </Menu.Item>
      <Menu.Item key="system">
        <Link to="/admin/system">System</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default Sidebar;
