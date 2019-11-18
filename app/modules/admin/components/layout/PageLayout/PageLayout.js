import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import Sidebar from '@/modules/admin/containers/layout/Sidebar';
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
      <Layout style={{ padding: '24px 24px' }}>
        {props.renderInsideCard ? (
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
        ) : (
          <Content>{props.children}</Content>
        )}
      </Layout>
    </Layout>
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node,
  renderInsideCard: PropTypes.bool,
};

PageLayout.defaultProps = {
  renderInsideCard: true,
};

export default PageLayout;
