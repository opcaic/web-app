import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import GameList from '@/modules/admin/components/Game/GameList';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  actions as gameActions,
  selectors as gameSelectos,
} from '../../../ducks/games';
import PageLayout from '@/modules/admin/components/layout/PageLayout';

/* eslint-disable react/prefer-stateless-function */
class GameListPage extends React.PureComponent {
  render() {
    return (
      <PageLayout>
        <Button type="primary" style={{ marginBottom: 20 }}>
          <Link to="/admin/games/new">
            <FormattedMessage id="app.admin.gameList.createNew" />
          </Link>
        </Button>

        <GameList
          dataSource={this.props.users}
          loading={this.props.isFetching}
          fetch={this.props.fetchGames}
          totalItems={this.props.totalItems}
        />
      </PageLayout>
    );
  }
}

GameListPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchGames: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchGames: params =>
      dispatch(
        gameActions.fetchMany({ params: Object.assign({ count: 10 }, params) }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  users: gameSelectos.getItems,
  isFetching: gameSelectos.isFetching,
  totalItems: gameSelectos.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GameListPage);
