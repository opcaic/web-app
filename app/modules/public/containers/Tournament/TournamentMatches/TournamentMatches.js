import React from 'react';
import PropTypes from 'prop-types';
import { matchPropType, tournamentPropType } from '@/modules/public/propTypes';
import MatchList from '@/modules/public/components/Tournament/MatchList';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/public/ducks/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { getMatchesListItems } from '@/modules/public/selectors/matches';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContent from '../../../components/Tournament/PageContent';

/* eslint-disable react/prefer-stateless-function */
export class TournamentMatches extends React.PureComponent {
  render() {
    return (
      <PageContent title="Matches" withPadding={false}>
        <MatchList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
        />
      </PageContent>
    );
  }
}

TournamentMatches.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'name', true, {
            tournamentId,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: getMatchesListItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentMatches);
