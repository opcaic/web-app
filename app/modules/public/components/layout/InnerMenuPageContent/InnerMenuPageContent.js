import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContent from '@/modules/public/components/layout/PageContent';

const Container = styled.div`
  background: white;
  min-height: 280px;
  margin-top: 15px;
  padding: 0 !important;
`;

const Content = styled.div`
  padding-left: 24px;
  width: auto;
  overflow: hidden;
  border-left: 1px solid #e8e8e8;
  position: relative;
  left: -1px;
`;

const InnerMenuPageContent = props => (
  <Container className="container" style={{ marginTop: 30 }}>
    {/* TODO: change to Container component */}
    <PageContent title={props.title}>
      {props.menu}
      <Content>{props.children}</Content>
    </PageContent>
  </Container>
);

InnerMenuPageContent.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
  menu: PropTypes.node.isRequired,
};

export default InnerMenuPageContent;
