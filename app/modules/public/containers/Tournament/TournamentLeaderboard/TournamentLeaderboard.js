import React from 'react';
import Leaderboard from '@/modules/shared/components/Tournament/Leaderboard';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  actions as leaderboardActions,
  selectors as leaderboardSelectors,
} from '@/modules/public/ducks/leaderboards';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import PageContent from '../../../components/layout/PageContent';
import { addSharedPlaces } from '@/modules/shared/helpers/leaderboards';
import PropTypes from 'prop-types';
import { tournamentPropType } from '@/modules/public/utils/propTypes';
import { pageTitles } from '@/modules/public/utils/pageTitles';

/* eslint-disable react/prefer-stateless-function */
export class TournamentLeaderboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchItems(this.props.tournament.id);
  }

  render() {
    return (
      <PageContent
        title={<FormattedMessage id="app.public.tourmamentLeaderboard.title" />}
        withPadding={false}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailLeaderboardPage,
          )}
        />

        <Leaderboard
          leaderboard={this.props.resource}
          dataSource={addSharedPlaces(
            (this.props.resource && this.props.resource.participations) || [],
          )}
          loading={this.props.isFetching}
        />
      </PageContent>
    );
  }
}

TournamentLeaderboard.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  resource: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId =>
      dispatch(leaderboardActions.fetchResource(tournamentId)),
  };
}

const mapStateToProps = createStructuredSelector({
  resource: leaderboardSelectors.getItem,
  isFetching: leaderboardSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentLeaderboard);
