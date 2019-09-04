import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';
import { lighten } from 'polished';

const Button = styled(({ color, ...rest }) => <ButtonAntd {...rest} />)`
  border-color: ${props => props.color};
  background-color: ${props => props.color};

  &:active,
  &:hover {
    border-color: ${props => lighten(0.2, props.color)};
    background-color: ${props => lighten(0.2, props.color)};
  }
`;

const StyledButton = ({ children, color, ...rest }) => (
  <Button color={color} {...rest}>
    {children}
  </Button>
);

StyledButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
};

StyledButton.defaultProps = {
  color: '#1a213a',
};

export default StyledButton;
