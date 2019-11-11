import { FormattedMessage } from 'react-intl';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Menu as AntMenu } from 'antd';
import { theme } from '@/modules/shared/helpers/utils';
import PropTypes from 'prop-types';

const Menu = styled(AntMenu)`
  line-height: 64px !important;
  color: white;
  list-style-type: none;
  margin: 0 !important;
  padding: 0 !important;
  display: inline-block !important;
  background-color: transparent !important;
  border: none !important;
`;

const MenuItem = styled(AntMenu.Item)`
  display: inline-block;
  cursor: pointer;
  font-weight: 400;
  padding: 0 10px;
  border-width: 0px !important;
  top: 0px !important;

  &.ant-menu-item-selected {
    background-color: ${theme.PRIMARY_COLOR} !important;
  }

  :hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const StyledLink = styled(Link)`
  color: white !important;
  text-decoration: none !important;
  line-height: 64px;
  display: inline-block;
  padding: 0 10px;

  :hover {
    color: rgba(255, 255, 255, 0.85) !important;
  }
`;

const BasicLeftMenu = ({ activeItems, isLoggedIn }) => (
  <Menu mode="horizontal" selectedKeys={activeItems}>
    <MenuItem key="home">
      <StyledLink to="/">
        <FormattedMessage id="app.public.topMenu.home" />
      </StyledLink>
    </MenuItem>
    <MenuItem key="tournaments">
      <StyledLink to="/tournaments">
        <FormattedMessage id="app.public.topMenu.tournaments" />
      </StyledLink>
    </MenuItem>
    <MenuItem key="games">
      <StyledLink to="/games">
        <FormattedMessage id="app.public.topMenu.games" />
      </StyledLink>
    </MenuItem>

    {isLoggedIn && [
      <MenuItem key="administration">
        <StyledLink to="/admin">
          <FormattedMessage id="app.public.topMenu.administration" />
        </StyledLink>
      </MenuItem>,
    ]}
  </Menu>
);

BasicLeftMenu.propTypes = {
  isLoggedIn: PropTypes.bool,
  activeItems: PropTypes.array,
};

export default BasicLeftMenu;
