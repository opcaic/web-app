import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
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
      <SubMenu key="tournaments" title={<span>Tournaments</span>}>
        <Menu.Item key="tournaments_new">
          <Link to="/admin/tournaments/create">Create new</Link>
        </Menu.Item>
        <Menu.Item key="tournaments_list">
          <Link to="/admin/tournaments">List</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  </Sider>
);

export default Sidebar;
