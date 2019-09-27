import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import TournamentCardList from '@/modules/public/components/Tournament/TournamentCardList';
import PropTypes from 'prop-types';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/public/ducks/tournaments';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/public/ducks/games';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { getTournamentsListItems } from '@/modules/public/selectors/tournaments';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';
import TournamentFilter from '@/modules/public/components/Tournament/TournamentFilter';
import {
  tournamentSimplifiedStateEnum,
  tournamentSortEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { getFilterParams } from '@/modules/shared/helpers/resources/tournaments';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListPage extends React.PureComponent {
  defaultFilterValues = {
    state: tournamentSimplifiedStateEnum.RUNNING,
    sortBy: tournamentSortEnum.DEADLINE_SOON_FIRST,
  };

  componentWillMount() {
    this.props.fetchItems(getFilterParams(this.defaultFilterValues));
    this.props.fetchGames();
  }

  onFilterChange = selectedValues => {
    const params = getFilterParams(selectedValues);

    this.props.fetchItems(params);
  };

  render() {
    return (
      <PageLayout
        title={intlGlobal.formatMessage(pageTitles.tournamentListPage)}
      >
        <PageTitle
          title={intlGlobal.formatMessage(pageTitles.tournamentListPage)}
        />

        <Container>
          <TournamentFilter
            onChange={this.onFilterChange}
            initialValues={this.defaultFilterValues}
            games={this.props.games || []}
            isFetchingGames={this.props.isFetchingGames}
          />
          <TournamentCardList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems}
            totalItems={this.props.totalItems}
          />
        </Container>
      </PageLayout>
    );
  }
}

TournamentListPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array,
  isFetchingGames: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(
        tournamentActions.fetchMany(
          // TODO: how to sort this?
          // TODO: count 100 should not be here? pagination maybe?
          prepareFilterParams(params, 'name', true, { count: 100 }),
        ),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany(
          prepareFilterParams({}, 'name', true, { count: 100 }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: getTournamentsListItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
  games: gameSelectors.getItems,
  isFetchingGames: gameSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListPage);
