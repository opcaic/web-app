/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Avatar, Dropdown, Icon, Menu as AntMenu } from 'antd';

const Header = styled.header`
  background: #1a213a;
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
`;

const Menu = styled.ul`
  line-height: 64px;
  color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: inline-block;
`;

const MenuItem = styled.li`
  display: inline-block;
  cursor: pointer;
  font-weight: 100;
  padding: 0 10px;
  
  :hover {
    color: rgba(255, 255, 255, 0.85);
  }
`;

const AuthMenuItem = styled(MenuItem)`
  padding: 0 5px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none !important;
  line-height: 64px;
  display: inline-block;
  padding: 0 10px;
  
  :hover {
    color: rgba(255, 255, 255, 0.85);
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
    <AntMenu.Item key="logout" onClick={() => logout()}>
      <FormattedMessage id="app.topMenu.logout" />
    </AntMenu.Item>
  </UserMenu>
);

const languageMenu = (changeLocale) => (
  <LanguageMenu>
    <AntMenu.Item key="english" onClick={() => changeLocale('en')}>
      <FormattedMessage id="app.topMenu.english" />
    </AntMenu.Item>
    <AntMenu.Item key="czech" onClick={() => changeLocale('cs')}>
      <FormattedMessage id="app.topMenu.czech" />
    </AntMenu.Item>
  </LanguageMenu>
);

const TopMenu = ({ changeLocale, isLoggedIn, logout }) => (
  <Header>
    <div className="container" style={{ padding: 0 }}>
      <Menu>
        <MenuItem key="home">
          <StyledLink to="/">
            <FormattedMessage id="app.topMenu.home" />
          </StyledLink>
        </MenuItem>
        <MenuItem key="tournaments">
          <StyledLink to="/tournaments">
            <FormattedMessage id="app.topMenu.tournaments" />
          </StyledLink>
        </MenuItem>
        <MenuItem key="games">
          <StyledLink to="/games">
            <FormattedMessage id="app.topMenu.games" />
          </StyledLink>
        </MenuItem>

        {isLoggedIn
          && [
            <MenuItem key="administration">
              <StyledLink to="/admin">
                <FormattedMessage id="app.topMenu.administration" />
              </StyledLink>
            </MenuItem>,
          ]}
      </Menu>

      <Menu style={{float: 'right'}}>
        <LanguageButton overlay={languageMenu(changeLocale)} trigger={['click']}>
          <div>
            <span style={{marginRight: 5}}>
              <FormattedMessage id="app.topMenu.language" />
            </span>
            <Icon type="caret-down" />
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
                <FormattedMessage id="app.topMenu.login"/>
              </StyledLink>
            </AuthMenuItem>,
            <span key="slash">/</span>,
            <AuthMenuItem key="register">
              <StyledLink to="/register">
                <FormattedMessage id="app.topMenu.register"/>
              </StyledLink>
            </AuthMenuItem>,
          ]
        }
      </Menu>
    </div>
  </Header>
);

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default TopMenu;
