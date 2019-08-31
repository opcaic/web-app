import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from '@/modules/public/containers/TopMenu';

const PageLayout = props => (
  <Layout className="layout" style={{ minHeight: '100vh', paddingBottom: 50 }}>
    <TopMenu />
    {props.children}
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
