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
import { pageTitles } from '@/modules/shared/utils/pageTitles';
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
import qs from 'query-string';
import { withRouter } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class TournamentListPage extends React.PureComponent {
  defaultSelectedValues = {
    state: tournamentSimplifiedStateEnum.RUNNING,
    sortByRunning: tournamentRunningSortEnum.DEADLINE_SOON_FIRST,
    sortByFinished: tournamentFinishedSortEnum.FINISHED_RECENTLY_FIRST,
  };

  state = {
    selectedFilterValues: this.defaultSelectedValues,
    // When the filter changes, we want to reset the state of the tournament list and
    // this is most easily done by remounting the list component by setting a different key
    filterStateNumber: 0,
  };

  isMounted = false;

  componentDidMount() {
    this.isMounted = true;
    this.props.fetchGames();
    this.onRouteChanged();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  onFilterChange = selectedValues => {
    this.props.history.push(`/tournaments?${qs.stringify(selectedValues)}`);
  };

  onRouteChanged = () => {
    const selectedValues = this.props.location.search
      ? qs.parse(this.props.location.search)
      : this.defaultSelectedValues;

    Object.keys(selectedValues).forEach(key => {
      selectedValues[key] = parseInt(selectedValues[key], 10);
    });

    this.setState(state => ({
      selectedFilterValues: selectedValues,
      filterStateNumber: state.filterStateNumber + 1,
    }));
  };

  fetchData = (additionalParams, successCallback, failureCallback) => {
    if (this.isMounted) {
      this.props.fetchItems(
        getFilterParams(this.state.selectedFilterValues),
        additionalParams,
        successCallback,
        failureCallback,
      );
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
            selectedValues={this.state.selectedFilterValues}
            games={this.props.games || []}
            isFetchingGames={this.props.isFetchingGames}
          />

          <TournamentCardListLoadMore
            key={this.state.filterStateNumber}
            pageSize={12}
            fetchData={this.fetchData}
            updateFilter={selectedValues =>
              this.onFilterChange(
                Object.assign(
                  {},
                  this.state.selectedFilterValues,
                  selectedValues,
                ),
              )
            }
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
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
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

export default compose(
  withRouter,
  withConnect,
)(TournamentListPage);
