import React from 'react';
import TournamentCardList from '@/modules/public/components/Tournament/TournamentCardList';
import PropTypes from 'prop-types';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/public/ducks/tournamentsFeatured';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { transformTournamentForList } from '@/modules/public/helpers/tournaments';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import StyledButton from '@/modules/shared/components/StyledButton';
import Container from '@/modules/public/components/layout/Container';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class FeaturedTournaments extends React.PureComponent {
  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <Container>
        <Typography.Title level={1} style={{ marginBottom: 30 }}>
          <FormattedMessage id="app.public.featuredTournaments.title" />
        </Typography.Title>

        <TournamentCardList
          dataSource={this.props.items.map(transformTournamentForList)}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems}
          totalItems={this.props.totalItems}
          emptyText={
            <FormattedMessage id="app.public.featuredTournaments.noTournaments" />
          }
        />

        {this.props.totalItems > 4 && (
          <div style={{ textAlign: 'center' }}>
            <StyledButton type="primary" size="large">
              <Link to="/tournaments">
                <FormattedMessage id="app.public.featuredTournaments.button" />
              </Link>
            </StyledButton>
          </div>
        )}
      </Container>
    );
  }
}

FeaturedTournaments.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(
        tournamentActions.fetchMany(
          prepareFilterParams(
            { count: 4, acceptsSubmission: true },
            'published',
            false,
          ),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: tournamentSelectors.getItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FeaturedTournaments);
