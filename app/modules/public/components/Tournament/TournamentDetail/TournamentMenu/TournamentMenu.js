import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Menu } from 'antd';
import { breakpoints } from '@/modules/shared/helpers/responsive';

const StyledMenu = styled(Menu)`
  border-bottom: 0;
  width: 150px;

  @media ${breakpoints.sm} {
    width: 300px;
  }

  @media ${breakpoints.md} {
    width: 100%;
  }
`;

const StyledMenuItem = styled(({ themeColor, ...rest }) => (
  <Menu.Item {...rest} />
))`
  padding: 0px 10px !important;

  &.ant-menu-item-selected,
  &:hover {
    border-bottom-color: ${props => props.themeColor} !important;
  }

  &.ant-menu-item-selected a {
    color: ${props => props.themeColor} !important;
  }

  @media ${breakpoints.lg} {
    padding: 0px 20px !important;
  }
`;

const StyledLink = styled(({ themeColor, ...rest }) => <Link {...rest} />)`
  border-bottom: 0;

  &:hover {
    color: ${props => props.themeColor} !important;
  }
`;

const PrivateText = styled.span`
  font-weight: 600;
`;

function getLink(id, item) {
  return `/tournaments/${id}/${item.path}`;
}

const TournamentMenu = ({ id, items, activeItems, themeColor }) => (
  <StyledMenu mode="horizontal" selectedKeys={activeItems}>
    {items.map(item => (
      <StyledMenuItem key={item.key} themeColor={themeColor}>
        <StyledLink to={getLink(id, item)} themeColor={themeColor}>
          {item.private ? <PrivateText>{item.text}</PrivateText> : item.text}
        </StyledLink>
      </StyledMenuItem>
    ))}
  </StyledMenu>
);

TournamentMenu.propTypes = {
  id: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  activeItems: PropTypes.array,
};

export default TournamentMenu;
