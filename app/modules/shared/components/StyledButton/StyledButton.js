import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button as ButtonAntd } from 'antd';
import { lighten } from 'polished';
import { theme } from '@/modules/shared/helpers/utils';

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
  color: theme.PRIMARY_COLOR,
};

export default StyledButton;
