import React from 'react';
import { Button, Popconfirm } from 'antd';
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
  const {
    handleClick,
    confirmTitle,
    createAction,
    message,
    type,
    state,
  } = props;

  return (
    <Popconfirm
      placement="left"
      onConfirm={() => handleClick(state, createAction())}
      title={confirmTitle}
    >
      <Button type={type} size="large" style={{ marginLeft: 5 }}>
        {message}
      </Button>
    </Popconfirm>
  );
};

ActionButton.propTypes = {
  handleClick: PropTypes.func,
  createAction: PropTypes.func,
  confirmTitle: PropTypes.node,
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
    confirmTitle={
      <FormattedMessage id="app.admin.confirms.publishTournament" />
    }
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
    confirmTitle={<FormattedMessage id="app.admin.confirms.startTournament" />}
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
    confirmTitle={<FormattedMessage id="app.admin.confirms.pauseTournament" />}
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
    confirmTitle={
      <FormattedMessage id="app.admin.confirms.unpauseTournament" />
    }
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
    confirmTitle={<FormattedMessage id="app.admin.confirms.stopTournament" />}
    type="danger"
    {...props}
  />
);

class TournamentActionButtons extends React.PureComponent {
  render() {
    const { resource, ...rest } = this.props;

    const buttons = [];

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

    buttons.push(
      <Popconfirm
        placement="left"
        onConfirm={() => this.props.cloneTournament(resource.id)}
        title={<FormattedMessage id="app.admin.confirms.cloneTournament" />}
      >
        <Button type="default" style={{ marginLeft: 15 }}>
          <FormattedMessage id="app.admin.tournamentList.clone" />
        </Button>
      </Popconfirm>,
    );

    if (this.props.canDelete) {
      buttons.push(
        <Popconfirm
          placement="left"
          title={
            resource.state !== tournamentStateEnum.RUNNING ? (
              <FormattedMessage id="app.admin.confirms.deleteTournament" />
            ) : (
              <FormattedMessage id="app.admin.confirms.deleteRunningTournament" />
            )
          }
          onConfirm={() => this.props.deleteTournament(resource.id)}
        >
          <Button type="danger" style={{ marginLeft: 5 }}>
            <FormattedMessage id="app.generic.delete" />
          </Button>
        </Popconfirm>,
      );
    }

    return <div>{buttons}</div>;
  }
}

TournamentActionButtons.propTypes = {
  resource: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TournamentActionButtons;
