import React from 'react';
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
import { Typography } from 'antd';
import StyledButton from '@/modules/shared/components/StyledButton';
import { Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */
export class FeaturedGames extends React.PureComponent {
  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 40 }}>
        <Typography.Title level={1} style={{ marginBottom: 30 }}>
          Featured games
        </Typography.Title>

        <GameList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems}
        />

        <div style={{ textAlign: 'center' }}>
          <StyledButton type="primary" size="large">
            <Link to="/games">Browse all games</Link>
          </StyledButton>
        </div>
      </div>
    );
  }
}

FeaturedGames.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(gamePropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(
        gameActions.fetchMany(
          prepareFilterParams({ count: 4 }, 'activeTournamentsCount', true),
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

export default compose(withConnect)(FeaturedGames);
