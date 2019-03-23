/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { Layout, Menu, Tabs } from 'antd';
import styled from 'styled-components';

import GlobalStyle from '../../global-styles';

const { Header, Footer } = Layout;
const TabPane = Tabs.TabPane;

import { Typography } from 'antd';

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

export default function App() {
  return (
    <div>
      <GlobalStyle />

      <Layout className="layout" style={{ height: '100vh' }}>
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

        <Submenu>
          <div className="container">
            <SubmenuMenu>
              <SubmenuItem style={{ fontSize: '22px' }}>
                Tic-Tac-Toe
              </SubmenuItem>
              <SubmenuItem>How to play</SubmenuItem>
              <SubmenuItem>Match log</SubmenuItem>
            </SubmenuMenu>
          </div>
        </Submenu>

        <div
          className="container"
          style={{
            padding: '10px 25px',
            background: '#fff',
            minHeight: 280,
            marginTop: 30,
          }}
        >
          <Title level={2} style={{ marginTop: '10px' }}>
            OVERVIEW
          </Title>
          {/* <Tabs defaultActiveKey="1" size="large">
            <TabPane tab="Overview" key="1">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </TabPane>
            <TabPane tab="How to play" key="2">
              Tab 2
            </TabPane>
            <TabPane tab="Match log" disabled key="3">
              Tab 3
            </TabPane>
            <TabPane tab="Submit solution" key="3">
              Tab 3
            </TabPane>
        </Tabs> */}
        </div>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
