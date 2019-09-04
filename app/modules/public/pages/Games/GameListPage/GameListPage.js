import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import GameList from '@/modules/public/components/Game/GameList';
import PropTypes from 'prop-types';
import {
  actions as gameActions,
  selectors as gameSelectors,
} from '@/modules/public/ducks/games';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { gamePropType } from '@/modules/public/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

/* eslint-disable react/prefer-stateless-function */
export class GameListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <PageLayout>
        <div className="container" style={{ marginTop: 30 }}>
          <GameList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems}
          />
        </div>
      </PageLayout>
    );
  }
}

GameListPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(gamePropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(
        gameActions.fetchMany(
          // TODO: how to sort this?
          prepareFilterParams({ count: 100 }, 'activeTournamentsCount', true),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: gameSelectors.getItems,
  isFetching: gameSelectors.isFetching,
  totalItems: gameSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameListPage);
