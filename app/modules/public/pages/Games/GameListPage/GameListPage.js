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
import { gamePropType } from '@/modules/public/utils/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';

/* eslint-disable react/prefer-stateless-function */
export class GameListPage extends React.PureComponent {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <PageLayout>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.gameListPage)} />

        <Container>
          <GameList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems}
          />
        </Container>
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
