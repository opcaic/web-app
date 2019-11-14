import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { FormattedMessage } from 'react-intl';
import { intlMessages } from './localization';
const { Sider } = Layout;

const Sidebar = ({ activeItems, allItems }) => (
  <Sider width={250}>
    <Link to="/admin">
      <div
        className="logo"
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          cursor: 'pointer',
        }}
      />
    </Link>
    <Menu
      mode="inline"
      theme="dark"
      style={{ borderRight: 0 }}
      selectedKeys={activeItems}
    >
      {allItems.map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>
            <div>{intlGlobal.formatMessage(intlMessages[item.labelName])}</div>
          </Link>
        </Menu.Item>
      ))}

      <Menu.Divider />
      <Menu.Item key="public">
        <Link to="/">
          <div>
            <FormattedMessage id="app.admin.sidebar.backToPublic" />
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

Sidebar.propTypes = {
  activeItems: PropTypes.arrayOf(PropTypes.string),
  allItems: PropTypes.array,
};

export default Sidebar;
