import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import styled, { css } from 'styled-components';
import { breakpoints } from '@/modules/shared/helpers/responsive';

const Container = styled.div`
  background: white;
  margin-top: 15px;
  padding: 0 !important;
`;

const Header = styled.div`
  padding: 15px 25px;
`;

const Title = styled(Typography.Title)`
  font-size: 30px !important;
  margin: 0 !important;
  display: inline-block;
`;

const Buttons = styled.div`
  margin-top: 10px;
  position: relative;

  display: block;

  @media ${breakpoints.md} {
    margin-left: 15px;
    display: inline-block;
    margin-top: 0px;
    top: -3px;
  }
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
    <Header>
      <Title>{props.title}</Title>
      <Buttons>{props.buttons}</Buttons>
    </Header>
    <Content withPadding={props.withPadding}>{props.children}</Content>
  </Container>
);

PageContent.propTypes = {
  children: PropTypes.any,
  title: PropTypes.node.isRequired,
  withPadding: PropTypes.bool,
  buttons: PropTypes.node,
};

PageContent.defaultProps = {
  withPadding: true,
};

export default PageContent;
