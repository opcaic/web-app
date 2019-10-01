import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { theme } from '@/modules/shared/helpers/utils';

const StyledMenu = styled(({ themeColor, ...rest }) => <Menu {...rest} />)`
  border-bottom: 0;
  min-width: 160px;
  float: left;
  text-align: right;
  z-index: 100;
  position: relative;

  &.ant-menu-vertical .ant-menu-item::after {
    border-right: 2px solid ${props => props.themeColor} !important;
  }

  &.ant-menu-vertical .ant-menu-item-selected::after {
    -webkit-transform: scaleY(1);
    -ms-transform: scaleY(1);
    transform: scaleY(1);
    opacity: 1;
    -webkit-transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      opacity 0.15s cubic-bezier(0.645, 0.045, 0.355, 1),
      -webkit-transform 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-color: ${props => props.themeColor} !important;
    border-right-width: 2px;
  }

  &.ant-menu-vertical .ant-menu-item-selected {
    font-weight: 500;
    background-color: initial !important;
  }

  &.ant-menu-vertical .ant-menu-item {
    display: block;
    float: none;
    margin: 0 -1px 0 0;
    padding: 0px 24px;
  }
`;

const StyledMenuItem = styled(({ themeColor, ...rest }) => (
  <Menu.Item {...rest} />
))`
  &.ant-menu-item-selected,
  &:hover {
    border-color: ${props => props.themeColor} !important;
  }

  &.ant-menu-item-selected a {
    color: ${props => props.themeColor} !important;
  }
`;

const StyledLink = styled(({ themeColor, ...rest }) => <Link {...rest} />)`
  border-bottom: 0;

  &:hover {
    color: ${props => props.themeColor} !important;
  }
`;

const InnerMenu = ({ items, activeItems, themeColor, ...rest }) => (
  <StyledMenu selectedKeys={activeItems} {...rest} themeColor={themeColor}>
    {items.map(item => (
      <StyledMenuItem key={item.key} themeColor={themeColor}>
        <StyledLink to={item.link} themeColor={themeColor}>
          {item.text}
        </StyledLink>
      </StyledMenuItem>
    ))}
  </StyledMenu>
);

InnerMenu.propTypes = {
  themeColor: PropTypes.string,
  items: PropTypes.array.isRequired,
  activeItems: PropTypes.array,
};

InnerMenu.defaultProps = {
  themeColor: theme.PRIMARY_COLOR,
};

export default InnerMenu;
