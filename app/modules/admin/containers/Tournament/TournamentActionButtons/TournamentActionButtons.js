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

    switch (resource.state) {
      case tournamentStateEnum.CREATED:
        return (
          <div>
            <PublishButton tournamentId={resource.id} {...rest} />
          </div>
        );
      case tournamentStateEnum.PUBLISHED:
        return (
          <div>
            <StartButton tournamentId={resource.id} {...rest} />
          </div>
        );
      case tournamentStateEnum.RUNNING:
        return (
          <div>
            <PauseButton tournamentId={resource.id} {...rest} />
            {resource.scope !== tournamentScopeEnum.DEADLINE && (
              <StopButton tournamentId={resource.id} {...rest} />
            )}
          </div>
        );
      case tournamentStateEnum.PAUSED:
        return (
          <div>
            <UnpauseButton tournamentId={resource.id} {...rest} />
            <StopButton tournamentId={resource.id} {...rest} />
          </div>
        );
      case tournamentStateEnum.WAITING_FOR_FINISH:
      case tournamentStateEnum.FINISHED:
      default:
        return <div />;
    }
  }
}

TournamentActionButtons.propTypes = {
  resource: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TournamentActionButtons;
