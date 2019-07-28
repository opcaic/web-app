import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import withSyncedActiveItems from '@/modules/shared/helpers/hocs/withSyncedActiveItems';

const { Header, Content } = Layout;
const SyncedSidebar = withSyncedActiveItems(Sidebar, 'adminSidebar');

const PageLayout = props => (
  <Layout style={{ minHeight: '100vh' }}>
    <SyncedSidebar />
    <Layout>
      <Header className="header" style={{ background: '#fff', padding: 0 }}>
        <div className="logo" />
      </Header>
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
