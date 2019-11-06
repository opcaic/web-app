import React from 'react';
import { Select, Button } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class ManagersCreator extends React.PureComponent {
  state = {
    selectedValue: undefined,
  };

  handleValueChanged = value => this.setState({ selectedValue: value });

  handleClick = () => {
    this.setState({ selectedValue: undefined });
    this.props.createManager(this.state.selectedValue);
  };

  render() {
    return (
      <div>
        <Select
          style={{ width: '25%' }}
          placeholder={
            <FormattedMessage id="app.admin.tournamentManagers.selectPlaceholder" />
          }
          onSelect={this.handleValueChanged}
          value={this.state.selectedValue}
        >
          {this.props.organizerUsers.map(user => (
            <Select.Option key={user.email} value={user.email}>
              {user.email}
            </Select.Option>
          ))}
        </Select>
        <Button
          disabled={this.state.selectedValue === null}
          onClick={this.handleClick}
          type="primary"
          loading={this.props.isCreating}
          style={{ marginLeft: 10 }}
        >
          <FormattedMessage id="app.admin.tournamentManagers.create" />
        </Button>
      </div>
    );
  }
}

ManagersCreator.propTypes = {
  organizerUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  createManager: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired,
};

export default ManagersCreator;
