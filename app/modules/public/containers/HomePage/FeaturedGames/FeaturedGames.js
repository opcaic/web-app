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
import Container from '@/modules/public/components/layout/Container';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class FeaturedGames extends React.PureComponent {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <Container>
        <Typography.Title level={1} style={{ marginBottom: 30 }}>
          <FormattedMessage id="app.public.featuredGames.title" />
        </Typography.Title>

        <GameList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems}
          emptyText={<FormattedMessage id="app.public.featuredGames.noGames" />}
        />

        {this.props.totalItems > 0 && (
          <div style={{ textAlign: 'center' }}>
            <StyledButton type="primary" size="large">
              <Link to="/games">
                <FormattedMessage id="app.public.featuredGames.button" />
              </Link>
            </StyledButton>
          </div>
        )}
      </Container>
    );
  }
}

FeaturedGames.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(gamePropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(
        gameActions.fetchMany(
          prepareFilterParams({ count: 4 }, 'activeTournamentsCount', false),
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
