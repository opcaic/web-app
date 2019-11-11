import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Icon } from 'antd';
import styled from 'styled-components';
import { theme } from '@/modules/shared/helpers/utils';
import Container from '@/modules/public/components/layout/Container';
import BasicLeftMenu from '@/modules/public/components/layout/TopMenu/LeftMenu/BasicLeftMenu';
import BasicRightMenu from '@/modules/public/components/layout/TopMenu/RightMenu/BasicRightMenu';
import DrawerLeftMenu from '@/modules/public/components/layout/TopMenu/LeftMenu/DrawerLeftMenu';
import DrawerRightMenu from '@/modules/public/components/layout/TopMenu/RightMenu/DrawerRightMenu';
import { FormattedMessage } from 'react-intl';
import { breakpoints } from '@/modules/shared/helpers/responsive';

const Header = styled.header`
  background-color: ${theme.TOP_MENU_COLOR};
  line-height: 64px;
`;

const BasicMenu = styled.div`
  display: none;

  @media ${breakpoints.md} {
    display: block;
  }
`;

const DrawerMenu = styled.div`
  display: block;

  @media ${breakpoints.md} {
    display: none;
  }
`;

class TopMenu extends Component {
  state = {
    visible: false,
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { changeLocale, isLoggedIn, logout, activeItems } = this.props;
    return (
      <Header>
        <Container marginTop={0}>
          <BasicMenu>
            <BasicLeftMenu isLoggedIn={isLoggedIn} activeItems={activeItems} />
            <BasicRightMenu
              isLoggedIn={isLoggedIn}
              changeLocale={changeLocale}
              logout={logout}
            />
          </BasicMenu>

          <DrawerMenu>
            <Button
              className="barsMenu"
              type="default"
              onClick={this.showDrawer}
              style={{ padding: '0px 10px' }}
            >
              <Icon type="menu" />
            </Button>

            <Drawer
              title={<FormattedMessage id="app.public.topMenu.menu" />}
              placement="right"
              closable
              onClose={this.onClose}
              visible={this.state.visible}
              bodyStyle={{ padding: 0 }}
            >
              <DrawerLeftMenu
                isLoggedIn={isLoggedIn}
                activeItems={activeItems}
              />
              <DrawerRightMenu
                isLoggedIn={isLoggedIn}
                changeLocale={changeLocale}
                logout={logout}
              />
            </Drawer>
          </DrawerMenu>
        </Container>
      </Header>
    );
  }
}

TopMenu.propTypes = {
  changeLocale: PropTypes.func,
  logout: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  activeItems: PropTypes.array,
};

export default TopMenu;
