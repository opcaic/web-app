import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from '@/modules/public/containers/TopMenu';
import Container from '@/modules/public/components/layout/Container';
import styled from 'styled-components';
import { theme } from '@/modules/shared/helpers/utils';
import Footer from '@/modules/public/components/layout/Footer';

const Title = styled(Container)`
  color: ${theme.TOP_MENU_COLOR};
  font-size: 30px;
  margin-top: 20px !important;
`;

const PageLayout = props => (
  <Layout className="layout">
    <TopMenu />
    <div style={{ minHeight: 'calc(100vh - 189px)' }}>
      {props.title && <Title>{props.title}</Title>}
      {props.children}
    </div>
    <Footer />
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default PageLayout;
