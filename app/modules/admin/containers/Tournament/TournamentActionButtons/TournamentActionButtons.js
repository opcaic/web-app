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

const ActionButton = props => {
  const { tournamentId, handleClick, createAction } = props;

  return (
    <Button onClick={() => handleClick(createAction(tournamentId))}>
      {'Publish'}
    </Button>
  );
};

ActionButton.propTypes = {
  tournamentId: PropTypes.number,
  handleClick: PropTypes.func,
  createAction: PropTypes.func,
};

const PublishButton = props => (
  <ActionButton createAction={publishTournament} {...props} />
);
const StartButton = props => (
  <ActionButton createAction={startTournament} {...props} />
);
const PauseButton = props => (
  <ActionButton createAction={pauseTournament} {...props} />
);
const UnpauseButton = props => (
  <ActionButton createAction={unpauseTournament} {...props} />
);
const StopButton = props => (
  <ActionButton createAction={stopTournament} {...props} />
);

class TournamentActionButtons extends React.PureComponent {
  render() {
    const { resource, handleClick } = this.props;
    return (
      <div>
        <PublishButton tournamentId={resource.id} handleClick={handleClick} />
        <StartButton tournamentId={resource.id} handleClick={handleClick} />
        <PauseButton tournamentId={resource.id} handleClick={handleClick} />
        <UnpauseButton tournamentId={resource.id} handleClick={handleClick} />
        <StopButton tournamentId={resource.id} handleClick={handleClick} />
      </div>
    );
  }
}

TournamentActionButtons.propTypes = {
  resource: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default TournamentActionButtons;
