import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import {
  actions as gamesActions,
  selectors as gamesSelectors,
} from '@/modules/public/ducks/games';
import { actions as tournamentsActions } from '@/modules/public/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import Container from '@/modules/public/components/layout/Container';
import ApiResult from '@/modules/shared/components/ApiResult';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import TournamentCardListLoadMore from '@/modules/public/components/Tournament/TournamentCardListLoadMore/TournamentCardListLoadMore';
import GameHeader from '@/modules/public/components/Game/GameHeader';
import styled from 'styled-components';
import { theme } from '@/modules/shared/helpers/utils';
import PageTitle from '@/modules/shared/components/PageTitle';
import { FormattedMessage } from 'react-intl';

const ListTitle = styled.div`
  color: ${theme.TOP_MENU_COLOR};
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 15px;
`;

/* eslint-disable react/prefer-stateless-function */
export class GameDetailPage extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.id);
  }

  fetchData = (additionalParams, successCallback, failureCallback) => {
    this.props.fetchTournaments(
      this.props.match.params.id,
      additionalParams,
      this.fetchDataSuccessCallback(successCallback),
      failureCallback,
    );
  };

  fetchDataSuccessCallback = originalSuccessCallback => (data, ...rest) => {
    const transformedData = {
      total: data.total,
      list: data.list,
    };

    if (originalSuccessCallback) {
      originalSuccessCallback(transformedData, ...rest);
    }
  };

  render() {
    return (
      <PageLayout>
        <Container>
          <ApiResult
            loading={this.props.resource === null || this.props.isFetching}
            error={this.props.error}
          >
            {this.props.resource && (
              <div>
                <PageTitle
                  title={this.props.resource && this.props.resource.name}
                />
                <GameHeader game={this.props.resource} />
              </div>
            )}

            <ListTitle>
              <FormattedMessage id="app.public.gameDetailPage.activeTournaments" />
            </ListTitle>
            <TournamentCardListLoadMore
              pageSize={8}
              fetchData={this.fetchData}
              emptyText={
                <FormattedMessage id="app.public.gameDetailPage.noTournaments" />
              }
            />
          </ApiResult>
        </Container>
      </PageLayout>
    );
  }
}

GameDetailPage.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.shape(tournamentPropType),
  match: PropTypes.object.isRequired,
  error: PropTypes.object,
  fetchTournaments: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(gamesActions.fetchResource(id)),
    fetchTournaments: (
      gameId,
      additionalParams,
      successCallback,
      failureCallback,
    ) =>
      dispatch(
        tournamentsActions.fetchMany(
          prepareFilterParams(
            { gameId, acceptsSubmission: true },
            'deadline',
            true,
            additionalParams,
          ),
          { meta: { successCallback, failureCallback } },
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: gamesSelectors.isFetchingItem,
  resource: gamesSelectors.getItem,
  error: gamesSelectors.getFetchItemError,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(GameDetailPage);
