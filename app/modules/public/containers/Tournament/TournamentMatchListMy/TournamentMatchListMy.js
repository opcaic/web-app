import React from 'react';
import PropTypes from 'prop-types';
import {
  matchPropType,
  tournamentPropType,
} from '@/modules/public/utils/propTypes';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/public/ducks/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { addLastExecutions } from '@/modules/shared/helpers/resources/matches';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import UserMatchList from '@/modules/shared/components/Tournament/UserMatchList';
import PageContent from '@/modules/public/components/layout/PageContent';

/* eslint-disable react/prefer-stateless-function */
export class TournamentMatchListMy extends React.PureComponent {
  render() {
    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentMatchListMy.title" />}
        withPadding={false}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailMatchesPage,
          )}
        />

        <UserMatchList
          dataSource={addLastExecutions(this.props.items)}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(
            this.props.tournament.id,
            this.props.currentUser.id,
          )}
          totalItems={this.props.totalItems}
          tournament={this.props.tournament}
          isAdmin={false}
          user={this.props.currentUser}
        />
      </PageContent>
    );
  }
}

TournamentMatchListMy.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: (tournamentId, userId) => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            tournamentId,
            state: matchStateEnum.EXECUTED,
            userId,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: matchSelectors.getItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentMatchListMy);
