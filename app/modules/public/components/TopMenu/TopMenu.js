import React from 'react';

import { Layout, Menu, Tabs, Typography } from 'antd';
import styled from 'styled-components';

import GlobalStyle from '../../../../global-styles';

const { Header, Footer } = Layout;
const TabPane = Tabs.TabPane;

const { Title } = Typography;

const Submenu = styled.div`
  background-color: white;
  color: white;
  border-bottom: 1px solid #e6e6e6;
`;

const SubmenuHeader = styled.h1`
  color: white;
  margin: 10px 0px;
`;

const SubmenuMenu = styled.ul`
  margin: 10px 0px;
  padding: 0px;
  list-style-type: none;
  font-family: Arial;
`;

const SubmenuItem = styled.li`
  margin-right: 20px;
  line-height: 40px;
  font-size: 16px;
  display: inline;
  cursor: pointer;
  color: #3949ab;
`;

export default function TopMenu() {
  return (
    <Header style={{ background: '#3949AB' }}>
      <div className="container" style={{ padding: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px', background: '#3949AB' }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Competitions</Menu.Item>
        </Menu>
      </div>
    </Header>
  );
}
