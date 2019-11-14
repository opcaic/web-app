import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints } from '@/modules/shared/helpers/responsive';

const StyledContainer = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media ${breakpoints.sm} {
    max-width: 540px;
  }

  @media ${breakpoints.md} {
    max-width: 720px;
  }

  @media ${breakpoints.lg} {
    max-width: 960px;
  }

  @media ${breakpoints.xl} {
    max-width: 1140px;
  }
`;

const Container = ({ children, marginTop, ...rest }) => (
  <StyledContainer style={{ marginTop }} {...rest}>
    {children}
  </StyledContainer>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  marginTop: PropTypes.number,
};

Container.defaultProps = {
  marginTop: 30,
};

export default Container;
