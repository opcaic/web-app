import React from 'react';
import PageLayout from '@/modules/public/components/layout/PageLayout';
import PropTypes from 'prop-types';
import { actions as gameActions } from '@/modules/public/ducks/games';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageTitle from '@/modules/shared/components/PageTitle';
import Container from '@/modules/public/components/layout/Container';
import GameListLoadMore from '@/modules/public/components/Game/GameListLoadMore';

/* eslint-disable react/prefer-stateless-function */
export class GameListPage extends React.PureComponent {
  render() {
    return (
      <PageLayout title={intlGlobal.formatMessage(pageTitles.gameListPage)}>
        <PageTitle title={intlGlobal.formatMessage(pageTitles.gameListPage)} />

        <Container>
          <GameListLoadMore pageSize={8} fetchData={this.props.fetchItems} />
        </Container>
      </PageLayout>
    );
  }
}

GameListPage.propTypes = {
  fetchItems: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: (additionalParams, successCallback, failureCallback) =>
      dispatch(
        gameActions.fetchMany(
          prepareFilterParams(
            {},
            'activeTournamentsCount',
            false,
            additionalParams,
          ),
          { meta: { successCallback, failureCallback } },
        ),
      ),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(GameListPage);
