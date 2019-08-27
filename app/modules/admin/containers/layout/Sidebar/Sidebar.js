import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { roleSelector } from '@/modules/shared/selectors/auth';
import PropTypes from 'prop-types';
import { menuItems } from './menuItems';
import SidebarComponent from '@/modules/admin/components/layout/Sidebar';

class Sidebar extends React.Component {
  // user can see component only if he has sufficient role
  canView(menuItem) {
    return this.props.userRole >= menuItem.requiredRole;
  }

  render() {
    const visibleItems = menuItems.filter(item => this.canView(item));

    return (
      <SidebarComponent
        activeItems={this.props.activeItems}
        allItems={visibleItems}
      />
    );
  }
}

Sidebar.propTypes = {
  userRole: PropTypes.number.isRequired,
  activeItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = createStructuredSelector({
  userRole: roleSelector,
});

export default connect(mapStateToProps)(Sidebar);
