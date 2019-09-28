import React from 'react';
import PropTypes from 'prop-types';
import {
  matchPropType,
  tournamentPropType,
} from '@/modules/public/utils/propTypes';
import MatchList from '@/modules/shared/components/Tournament/MatchList';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/public/ducks/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addLastExecutions } from '@/modules/shared/helpers/resources/matches';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import PageContent from '@/modules/public/components/layout/PageContent';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class TournamentMatchList extends React.PureComponent {
  render() {
    return (
      <PageContent
        title={<FormattedMessage id="app.public.tournamentMatchList.title" />}
        withPadding={false}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailMatchesPage,
          )}
        />

        <MatchList
          dataSource={addLastExecutions(this.props.items)}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
          tournament={this.props.tournament}
          isAdmin={false}
        />
      </PageContent>
    );
  }
}

TournamentMatchList.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            tournamentId,
            state: matchStateEnum.EXECUTED,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: matchSelectors.getItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentMatchList);
