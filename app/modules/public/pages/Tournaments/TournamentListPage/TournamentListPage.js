import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PropTypes from 'prop-types';
import { actions as tournamentActions } from '@/modules/public/ducks/tournaments';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/public/ducks/games';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';
import TournamentFilter from '@/modules/public/components/Tournament/TournamentFilter';
import {
  tournamentSimplifiedStateEnum,
  tournamentRunningSortEnum,
  tournamentFinishedSortEnum,
} from '@/modules/shared/helpers/enumHelpers';
import { getFilterParams } from '@/modules/shared/helpers/resources/tournaments';
import TournamentCardListLoadMore from '@/modules/public/components/Tournament/TournamentCardListLoadMore';
import { transformTournamentForList } from '@/modules/public/helpers/tournaments';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListPage extends React.PureComponent {
  state = {
    selectedFilterValues: {
      state: tournamentSimplifiedStateEnum.RUNNING,
      sortByRunning: tournamentRunningSortEnum.DEADLINE_SOON_FIRST,
      sortByFinished: tournamentFinishedSortEnum.FINISHED_RECENTLY_FIRST,
    },
    // When the filter changes, we want to reset the state of the tournament list and
    // this is most easily done by remounting the list component by setting a different key
    filterStateNumber: 0,
  };

  componentDidMount() {
    this.props.fetchGames();
  }

  onFilterChange = selectedValues => {
    this.setState(state => ({
      selectedFilterValues: selectedValues,
      filterStateNumber: state.filterStateNumber + 1,
    }));
  };

  fetchData = (additionalParams, successCallback, failureCallback) => {
    this.props.fetchItems(
      getFilterParams(this.state.selectedFilterValues),
      additionalParams,
      this.fetchDataSuccessCallback(successCallback),
      failureCallback,
    );
  };

  fetchDataSuccessCallback = originalSuccessCallback => (data, ...rest) => {
    const transformedData = {
      total: data.total,
      list: data.list.map(x => transformTournamentForList(x)),
    };

    if (originalSuccessCallback) {
      originalSuccessCallback(transformedData, ...rest);
    }
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
            initialValues={this.state.selectedFilterValues}
            games={this.props.games || []}
            isFetchingGames={this.props.isFetchingGames}
          />

          <TournamentCardListLoadMore
            key={this.state.filterStateNumber}
            pageSize={12}
            fetchData={this.fetchData}
          />
        </Container>
      </PageLayout>
    );
  }
}

TournamentListPage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array,
  isFetchingGames: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: (
      filterParams,
      additionalParams,
      successCallback,
      failureCallback,
    ) =>
      dispatch(
        tournamentActions.fetchMany(
          prepareFilterParams(filterParams, 'name', true, additionalParams),
          { meta: { successCallback, failureCallback } },
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
  games: gameSelectors.getItems,
  isFetchingGames: gameSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListPage);
