import React from 'react';
import { Button } from 'antd';
import {
  publishTournament,
  startTournament,
  pauseTournament,
  unpauseTournament,
  stopTournament,
} from '@/modules/admin/ducks/tournamentState';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import {
  tournamentStateEnum,
  tournamentScopeEnum,
} from '@/modules/shared/helpers/enumHelpers';

const ActionButton = props => {
  const { handleClick, createAction, message, type, state } = props;

  return (
    <Button
      type={type}
      size="large"
      onClick={() => handleClick(state, createAction())}
      style={{ marginLeft: 10 }}
    >
      {message}
    </Button>
  );
};

ActionButton.propTypes = {
  handleClick: PropTypes.func,
  createAction: PropTypes.func,
  message: PropTypes.object,
  type: PropTypes.string,
  state: PropTypes.number,
};

const PublishButton = props => (
  <ActionButton
    createAction={() =>
      publishTournament(props.tournamentId, null, props.failureCallback)
    }
    state={tournamentStateEnum.PUBLISHED}
    message={<FormattedMessage id="app.admin.tournamentForm.publish" />}
    type="primary"
    {...props}
  />
);
const StartButton = props => (
  <ActionButton
    createAction={() =>
      startTournament(props.tournamentId, null, props.failureCallback)
    }
    state={tournamentStateEnum.RUNNING}
    message={<FormattedMessage id="app.admin.tournamentForm.start" />}
    type="primary"
    {...props}
  />
);
const PauseButton = props => (
  <ActionButton
    createAction={() =>
      pauseTournament(props.tournamentId, null, props.failureCallback)
    }
    state={tournamentStateEnum.PAUSED}
    message={<FormattedMessage id="app.admin.tournamentForm.pause" />}
    type="normal"
    {...props}
  />
);
const UnpauseButton = props => (
  <ActionButton
    createAction={() =>
      unpauseTournament(props.tournamentId, null, props.failureCallback)
    }
    state={tournamentStateEnum.RUNNING}
    message={<FormattedMessage id="app.admin.tournamentForm.unpause" />}
    type="normal"
    {...props}
  />
);
const StopButton = props => (
  <ActionButton
    createAction={() =>
      stopTournament(props.tournamentId, null, props.failureCallback)
    }
    state={tournamentStateEnum.FINISHED}
    message={<FormattedMessage id="app.admin.tournamentForm.stop" />}
    type="danger"
    {...props}
  />
);

class TournamentActionButtons extends React.PureComponent {
  render() {
    const { resource, ...rest } = this.props;

    const buttons = [
      <Button
        type="default"
        onClick={() => this.props.cloneTournament(resource.id)}
      >
        <FormattedMessage id="app.admin.tournamentList.clone" />
      </Button>,
    ];

    if (this.props.canDelete) {
      buttons.push(
        <Button
          type="danger"
          onClick={() => this.props.deleteTournament(resource.id)}
        >
          <FormattedMessage id="app.generic.delete" />
        </Button>,
      );
    }

    switch (resource.state) {
      case tournamentStateEnum.CREATED:
        buttons.push(<PublishButton tournamentId={resource.id} {...rest} />);
        break;
      case tournamentStateEnum.PUBLISHED:
        buttons.push(<StartButton tournamentId={resource.id} {...rest} />);
        break;
      case tournamentStateEnum.RUNNING:
        buttons.push(<PauseButton tournamentId={resource.id} {...rest} />);
        if (resource.scope !== tournamentScopeEnum.DEADLINE)
          buttons.push(<StopButton tournamentId={resource.id} {...rest} />);
        break;
      case tournamentStateEnum.PAUSED:
        buttons.push(<UnpauseButton tournamentId={resource.id} {...rest} />);
        buttons.push(<StopButton tournamentId={resource.id} {...rest} />);
        break;
      case tournamentStateEnum.WAITING_FOR_FINISH:
      case tournamentStateEnum.FINISHED:
      default:
        break;
    }

    return <div>{buttons}</div>;
  }
}

TournamentActionButtons.propTypes = {
  resource: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TournamentActionButtons;
