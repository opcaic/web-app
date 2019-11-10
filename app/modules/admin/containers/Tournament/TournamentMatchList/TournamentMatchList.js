import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import {
  actions as matchActions,
  selectors as matchSelectors,
  createMatchExecution,
} from '@/modules/admin/ducks/matches';
import MatchList from '@/modules/shared/components/Tournament/MatchList/MatchList';

class TournamentMatchList extends React.PureComponent {
  state = {
    queuedMatchId: null,
  };

  createMatchExecution = matchId => {
    this.setState({ queuedMatchId: matchId });

    this.props.createMatchExecution(matchId, this.handleSuccess);
  };

  handleSuccess = () => {
    this.setState({ queuedMatchId: null });
  };

  render() {
    return (
      <div>
        <MatchList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
          tournament={this.props.tournament}
          isAdmin
          createMatchExecution={this.createMatchExecution}
          queuedMatchId={this.state.queuedMatchId}
        />
      </div>
    );
  }
}

TournamentMatchList.propTypes = {
  tournament: PropTypes.object,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  createMatchExecution: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            tournamentId,
          }),
        ),
      ),
    createMatchExecution: (matchId, successCallback, failureCallback) =>
      dispatch(createMatchExecution(matchId, successCallback, failureCallback)),
  };
}

const mapStateToProps = createStructuredSelector({
  items: matchSelectors.getItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentMatchList);
