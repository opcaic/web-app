import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
import TopMenu from '@/modules/public/containers/TopMenu';
import Container from '@/modules/public/components/layout/Container';
import styled from 'styled-components';
import { theme } from '@/modules/shared/helpers/utils';

const Title = styled(Container)`
  color: ${theme.TOP_MENU_COLOR};
  font-size: 30px;
  margin-top: 20px !important;
`;

const PageLayout = props => (
  <Layout className="layout" style={{ minHeight: '100vh', paddingBottom: 50 }}>
    <TopMenu />
    {props.title && <Title>{props.title}</Title>}
    {props.children}
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default PageLayout;
