import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { settings, theme } from '@/modules/shared/helpers/utils';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  margin: auto;
  // padding-top: 100px;

  ${props =>
    props.size === 'small' &&
    css`
      width: 343px;
    `};

  ${props =>
    props.size === 'medium' &&
    css`
      width: 600px;
    `};

  ${props =>
    props.size === 'large' &&
    css`
      width: 900px;
    `};
`;

const WrapperInner = styled.div`
  background: white;
  border-radius: 4px;
  border: 1px solid #d8e2e7;
  padding: 20px;
`;

const Logo = styled.div`
  text-align: center;
  margin: 40px 0;
  display: inline-block;
  width: 100%;
`;

const LogoLink = styled(Link)`
  color: ${theme.BANNER_COLOR} !important;
  display: inline-block;
  font-size: 30px;
  font-weight: 300;
`;

const NoMenuPageLayout = ({ children, ...rest }) => (
  <Wrapper {...rest}>
    <Logo>
      <LogoLink to="/">{settings.appName}</LogoLink>
    </Logo>
    <WrapperInner>{children}</WrapperInner>
  </Wrapper>
);

NoMenuPageLayout.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

NoMenuPageLayout.defaultProps = {
  size: 'small',
};

export default NoMenuPageLayout;
