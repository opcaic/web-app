import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';

const { Header, Content } = Layout;

const PageLayout = props => (
  <Layout style={{ height: '100vh' }}>
    <Header className="header">
      <div className="logo" />
    </Header>
    <Layout>
      <Sidebar />
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          style={{
            background: '#fff',
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
