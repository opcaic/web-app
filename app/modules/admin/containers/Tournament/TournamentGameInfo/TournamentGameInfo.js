import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Divider, Form, Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DynamicForm from '@/modules/shared/components/DynamicForm';
import {
  selectors as gameSelectors,
  actions as gameActions,
} from '@/modules/admin/ducks/games';
import PropTypes from 'prop-types';

const { Option } = Select;

class TournamentGameInfo extends React.Component {
  componentDidMount() {
    if (this.props.gameId) this.props.fetchGame(this.props.gameId);
  }

  handleGameChange = id => {
    this.props.fetchGame(id);
    this.props.onGameChange(id);
  };

  render() {
    return (
      <div>
        <Form.Item
          label={<FormattedMessage id="app.admin.tournamentForm.game" />}
        >
          <Select
            placeholder={
              <FormattedMessage id="app.admin.tournamentForm.gameSelectPlaceholder" />
            }
            disabled={this.props.gameChangeDisabled}
            onChange={value => this.handleGameChange(value)}
            value={this.props.gameId}
          >
            {this.props.games.map(x => (
              <Option value={x.id} key={x.id}>
                {x.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {this.props.game && (
          <div>
            <DynamicForm
              onConfigurationChanged={this.props.onConfigurationChanged}
              formSchema={this.props.game.configurationSchema}
              onBlur={this.onFormBlur}
              formData={this.props.configuration}
              errors={this.props.configurationErrors}
            />
            <Divider style={{ marginTop: 0 }} />
          </div>
        )}
      </div>
    );
  }
}

TournamentGameInfo.propTypes = {
  game: PropTypes.object,
  configuration: PropTypes.object,
  gameId: PropTypes.number,
  games: PropTypes.array,
  onGameChange: PropTypes.func.isRequired,
  gameChangeDisabled: PropTypes.bool,
  onConfigurationChanged: PropTypes.func.isRequired,
  fetchGame: PropTypes.func,
  configurationErrors: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  game: gameSelectors.getItem,
  games: gameSelectors.getItems,
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchGame: id => dispatch(gameActions.fetchResource(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TournamentGameInfo);
