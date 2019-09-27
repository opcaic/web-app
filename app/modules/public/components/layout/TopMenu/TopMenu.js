/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Avatar, Dropdown, Icon, Menu as AntMenu } from 'antd';
import { theme } from '@/modules/shared/helpers/utils';
import Container from '@/modules/public/components/layout/Container';

const Header = styled.header`
  background-color: ${theme.TOP_MENU_COLOR};
  padding: 0 50px;
  line-height: 64px;
`;

const Menu = styled(AntMenu)`
  line-height: 64px;
  color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
  background-color: transparent;
  border: none;
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

const AuthMenu = styled.ul`
  line-height: 64px;
  color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
`;

const AuthMenuItem = styled.li`
  display: inline-block;
  cursor: pointer;
  font-weight: 100;
  padding: 0 5px;
  
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

const UserButton = styled(Dropdown)`
  display: inline-block;
  cursor: pointer;
`;

const UserMenu = styled(AntMenu)`
  min-width: 150px;
`;

const LanguageButton = styled(Dropdown)`
  display: inline-block;
  cursor: pointer;
  margin-right: 15px;
  font-weight: 100;
`;

const LanguageMenu = styled(AntMenu)`
  min-width: 150px;
`;

const userMenu = (logout) => (
  <UserMenu>
    <AntMenu.Item key="account">
      <Link to="/settings/profile">
        <FormattedMessage id="app.public.topMenu.settings" />
      </Link>
    </AntMenu.Item>
    <AntMenu.Item key="logout" onClick={() => logout()}>
      <FormattedMessage id="app.public.topMenu.logout" />
    </AntMenu.Item>
  </UserMenu>
);

const languageMenu = (changeLocale) => (
  <LanguageMenu>
    <AntMenu.Item key="english" onClick={() => changeLocale('en')}>
      <FormattedMessage id="app.public.topMenu.english" />
    </AntMenu.Item>
    <AntMenu.Item key="czech" onClick={() => changeLocale('cs')}>
      <FormattedMessage id="app.public.topMenu.czech" />
    </AntMenu.Item>
  </LanguageMenu>
);

const TopMenu = ({ changeLocale, isLoggedIn, logout, activeItems }) => (
  <Header>
    <Container marginTop={0}>
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

        {isLoggedIn
          && [
            <MenuItem key="administration">
              <StyledLink to="/admin">
                <FormattedMessage id="app.public.topMenu.administration" />
              </StyledLink>
            </MenuItem>,
          ]}
      </Menu>

      <AuthMenu style={{ float: 'right' }}>
        <LanguageButton overlay={languageMenu(changeLocale)} trigger={['click']}>
          <div>
            <span style={{marginRight: 5}}>
              <FormattedMessage id="app.public.topMenu.language" />
            </span>
            <Icon type="caret-down"/>
          </div>
        </LanguageButton>

        {isLoggedIn
          ? (
            <UserButton overlay={userMenu(logout)} trigger={['click']}>
              <div>
                <Avatar size={32} icon="user" shape="square" style={{ marginRight: 5 }}/>
                <Icon type="caret-down"/>
              </div>
            </UserButton>
          )
          : [
            <AuthMenuItem key="login">
              <StyledLink to="/login">
                <FormattedMessage id="app.public.topMenu.login"/>
              </StyledLink>
            </AuthMenuItem>,
            <span key="slash">/</span>,
            <AuthMenuItem key="register">
              <StyledLink to="/register">
                <FormattedMessage id="app.public.topMenu.register"/>
              </StyledLink>
            </AuthMenuItem>,
          ]
        }
      </AuthMenu>
    </Container>
  </Header>
);

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  activeItems: PropTypes.array,
};

export default TopMenu;
