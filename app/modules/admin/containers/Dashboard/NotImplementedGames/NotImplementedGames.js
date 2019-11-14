import React from 'react';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/admin/ducks/games';
import {
  actions as workerActions,
  selectors as workerSelectors,
} from '@/modules/admin/ducks/workers';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import NotImplementedGameList from '@/modules/admin/components/Dashboard/NotImplementedGameList';
import { Card } from 'antd';
import CardTable from '@/modules/shared/components/CardTable';

class InvalidSubmissions extends React.Component {
  componentDidMount() {
    this.props.fetchGames();
    this.props.fetchWorkers();
  }

  getNotImplementedGames = () => {
    const supportedGames = this.props.workers
      .map(worker => worker.games)
      .reduce((acc, val) => acc.concat(val), []);

    return this.props.games.filter(game => !supportedGames.includes(game.key));
  };

  render() {
    return (
      <Card
        title={
          <FormattedMessage id="app.admin.dashboard.notImplementedGames" />
        }
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <NotImplementedGameList
            dataSource={this.getNotImplementedGames()}
            loading={this.props.isFetchingGames || this.props.isFetchingWorkers}
            size="small"
          />
        </CardTable>
      </Card>
    );
  }
}

InvalidSubmissions.propTypes = {
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  isFetchingGames: PropTypes.bool.isRequired,
  fetchWorkers: PropTypes.func.isRequired,
  workers: PropTypes.array.isRequired,
  isFetchingWorkers: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchGames: () =>
      dispatch(
        gameActions.fetchMany({ offset: 0, count: 100 }, 'created', false),
      ),
    fetchWorkers: () => dispatch(workerActions.fetchMany()),
  };
}

const mapStateToProps = createStructuredSelector({
  games: gameSelectors.getItems,
  isFetchingGames: gameSelectors.isFetching,
  workers: workerSelectors.getItems,
  isFetchingWorkers: workerSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(InvalidSubmissions);
