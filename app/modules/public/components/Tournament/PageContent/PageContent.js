import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import styled, { css } from 'styled-components';

const Container = styled.div`
  background: white;
  min-height: 280px;
  margin-top: 15px;
  padding: 0 !important;
`;

const Title = styled(Typography.Title)`
  padding: 15px 25px;
  font-size: 30px !important;
`;

const Content = styled.div`
  ${props =>
    props.withPadding &&
    css`
      padding: 0px 25px 25px;
    `};
`;

const PageContent = props => (
  <Container className="container">
    <Title>{props.title}</Title>
    <Content withPadding={props.withPadding}>{props.children}</Content>
  </Container>
);

PageContent.propTypes = {
  children: PropTypes.any,
  title: PropTypes.node.isRequired,
  withPadding: PropTypes.bool,
};

PageContent.defaultProps = {
  withPadding: true,
};

export default PageContent;
