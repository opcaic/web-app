import React from 'react';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/propTypes';
import TournamentOverviewComponent from '@/modules/public/components/Tournament/TournamentDetail/TournamentOverview';

/* eslint-disable react/prefer-stateless-function */
export class TournamentOverview extends React.PureComponent {
  render() {
    return <TournamentOverviewComponent tournament={this.props.tournament} />;
  }
}

TournamentOverview.propTypes = {
  tournament: PropTypes.shape(tournamentPropType).isRequired,
};

export default TournamentOverview;
