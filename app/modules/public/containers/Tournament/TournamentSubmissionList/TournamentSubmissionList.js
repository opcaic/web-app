import React from 'react';
import PropTypes from 'prop-types';
import {
  matchPropType,
  tournamentPropType,
} from '@/modules/public/utils/propTypes';
import {
  actions as submissionActions,
  selectors as submissionSelectors,
} from '@/modules/public/ducks/submissions';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import PageContent from '../../../components/layout/PageContent';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import SubmissionList from '@/modules/shared/components/Tournament/SubmissionList';
import TournamentPageTitle from '@/modules/shared/components/Tournament/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import TournamentAdminButton from '@/modules/public/components/Tournament/TournamentDetail/TournamentAdminButton/TournamentAdminButton';

/* eslint-disable react/prefer-stateless-function */
export class TournamentSubmissionList extends React.PureComponent {
  render() {
    return (
      <PageContent
        title={
          <FormattedMessage id="app.public.tournamentSubmissionList.title" />
        }
        withPadding={false}
        buttons={<TournamentAdminButton />}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailMySubmissionsPage,
          )}
        />

        <SubmissionList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(
            this.props.tournament.id,
            this.props.currentUser.id,
          )}
          totalItems={this.props.totalItems}
          view="public"
        />
      </PageContent>
    );
  }
}

TournamentSubmissionList.propTypes = {
  tournament: PropTypes.shape(tournamentPropType),
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: (tournamentId, authorId) => params =>
      dispatch(
        submissionActions.fetchMany(
          prepareFilterParams(params, 'created', false, {
            tournamentId,
            authorId,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: submissionSelectors.getItems,
  isFetching: submissionSelectors.isFetching,
  totalItems: submissionSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentSubmissionList);
