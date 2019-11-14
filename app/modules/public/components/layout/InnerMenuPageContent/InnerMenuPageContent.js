import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PageContent from '@/modules/public/components/layout/PageContent';
import Container from '@/modules/public/components/layout/Container';

const Content = styled.div`
  padding-left: 24px;
  width: auto;
  overflow: hidden;
  border-left: 1px solid #e8e8e8;
  position: relative;
  left: -1px;
`;

const InnerMenuPageContent = props => (
  <Container>
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
