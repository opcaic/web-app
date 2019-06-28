import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import TournamentList from '../../../components/Tournament/TournamentList';
import { actions as tournamentsActions } from '../../../ducks/tournaments';
import {
  makeSelectTournaments,
  makeSelectTournamentsIsFetching,
} from './selectors';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListPage extends React.PureComponent {
  static propTypes = {
    tournaments: PropTypes.arrayOf(PropTypes.object),
    isFetching: PropTypes.bool.isRequired,
    fetchTournaments: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchTournaments();
  }

  render() {
    return (
      <TournamentList
        dataSource={this.props.tournaments}
        loading={this.props.isFetching}
      />
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchTournaments: () => dispatch(tournamentsActions.fetchMany()),
  };
}

const mapStateToProps = createStructuredSelector({
  tournaments: makeSelectTournaments(),
  isFetching: makeSelectTournamentsIsFetching(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListPage);
