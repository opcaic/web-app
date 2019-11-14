import { FormattedMessage } from 'react-intl';
import { Avatar, Dropdown, Icon, Menu as AntMenu } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const userMenu = logout => (
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

const languageMenu = changeLocale => (
  <LanguageMenu>
    <AntMenu.Item key="english" onClick={() => changeLocale('en')}>
      <FormattedMessage id="app.public.topMenu.english" />
    </AntMenu.Item>
    <AntMenu.Item key="czech" onClick={() => changeLocale('cs')}>
      <FormattedMessage id="app.public.topMenu.czech" />
    </AntMenu.Item>
  </LanguageMenu>
);

const BasicRightMenu = ({ isLoggedIn, logout, changeLocale }) => (
  <AuthMenu style={{ float: 'right' }}>
    <LanguageButton overlay={languageMenu(changeLocale)} trigger={['click']}>
      <div>
        <span style={{ marginRight: 5 }}>
          <FormattedMessage id="app.public.topMenu.language" />
        </span>
        <Icon type="caret-down" />
      </div>
    </LanguageButton>

    {isLoggedIn ? (
      <UserButton overlay={userMenu(logout)} trigger={['click']}>
        <div>
          <Avatar
            size={32}
            icon="user"
            shape="square"
            style={{ marginRight: 5 }}
          />
          <Icon type="caret-down" />
        </div>
      </UserButton>
    ) : (
      [
        <AuthMenuItem key="login">
          <StyledLink to="/login">
            <FormattedMessage id="app.public.topMenu.login" />
          </StyledLink>
        </AuthMenuItem>,
        <span key="slash">/</span>,
        <AuthMenuItem key="register">
          <StyledLink to="/register">
            <FormattedMessage id="app.public.topMenu.register" />
          </StyledLink>
        </AuthMenuItem>,
      ]
    )}
  </AuthMenu>
);

BasicRightMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};

export default BasicRightMenu;
