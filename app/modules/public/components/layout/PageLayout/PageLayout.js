import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from '@public/components/TopMenu';

const PageLayout = props => (
  <Layout className="layout" style={{ height: '100vh' }}>
    <TopMenu />
    {props.children}
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
