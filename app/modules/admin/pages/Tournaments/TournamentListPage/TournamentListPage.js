import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '../../../ducks/tournaments';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '../../../ducks/games';
import TournamentList from '@/modules/admin/components/Tournament/TournamentList';
import PageLayout from '@/modules/admin/components/layout/PageLayout';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

/* eslint-disable react/prefer-stateless-function */
class TournamentListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <PageLayout>
        <Button type="primary" style={{ marginBottom: 20 }}>
          <Link to="/admin/tournaments/new">
            <FormattedMessage id="app.admin.tournamentList.createNew" />
          </Link>
        </Button>

        <TournamentList
          dataSource={this.props.items}
          loading={this.props.isFetching || this.props.isFetchingGames}
          fetch={this.props.fetchItems}
          totalItems={this.props.totalItems}
          games={this.props.games}
        />
      </PageLayout>
    );
  }
}

TournamentListPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  games: PropTypes.arrayOf(PropTypes.object),
  isFetchingGames: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(
        tournamentActions.fetchMany(
          prepareFilterParams(params, 'created', false),
        ),
      ),
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({
          count: 100,
          sortBy: 'name',
          asc: true,
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: tournamentSelectors.getItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
  isFetchingGames: gameSelectors.isFetching,
  games: gameSelectors.getItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentListPage);
