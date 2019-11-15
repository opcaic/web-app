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
import { roleSelector } from '@/modules/shared/selectors/auth';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';

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
    const additionalParams = {
      managedOnly: this.props.userRole === userRoleEnum.ORGANIZER,
    };

    return (
      <div>
        <MatchList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(additionalParams)(
            this.props.tournament.id,
          )}
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
  userRole: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: additionalParams => tournamentId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(
            Object.assign({}, additionalParams, params),
            'executed',
            false,
            {
              tournamentId,
              anonymize: false,
            },
          ),
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
  userRole: roleSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentMatchList);
