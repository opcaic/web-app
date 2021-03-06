import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as submissionsActions,
  selectors as submissionsSelectors,
} from '@/modules/public/ducks/submissions';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/public/ducks/matches';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PageContent from '@/modules/public/components/layout/PageContent';
import TournamentPageTitle from '@/modules/shared/components/Tournament/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import Submission from '@/modules/shared/components/Tournament/Submission';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { downloadSubmission } from '@/modules/shared/ducks/submission';
import ApiResult from '@/modules/shared/components/ApiResult';
import TournamentAdminButton from '@/modules/public/components/Tournament/TournamentDetail/TournamentAdminButton/TournamentAdminButton';

/* eslint-disable react/prefer-stateless-function */
class TournamentSubmissionDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.submissionId);
  }

  render() {
    return (
      <PageContent
        title={
          <FormattedMessage id="app.public.tournamentSubmissionDetail.title" />
        }
        buttons={[
          <Button
            type="default"
            size="small"
            style={{ marginRight: 10 }}
            key="back"
          >
            <Link to={`/tournaments/${this.props.tournament.id}/submissions/`}>
              <FormattedMessage id="app.generic.backToList" />
            </Link>
          </Button>,
          <TournamentAdminButton key="admin" />,
        ]}
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailSubmissionPage,
          )}
        />

        <ApiResult
          loading={this.props.isFetching || this.props.resource === null}
          error={this.props.error}
        >
          <Submission
            submission={this.props.resource}
            tournament={this.props.tournament}
            matches={this.props.matches}
            isFetchingMatches={this.props.isFetchingMatches}
            fetchMatches={this.props.fetchMatches(
              this.props.match.params.submissionId,
            )}
            matchesTotalItems={this.props.matchesTotalItems}
            validations={
              this.props.resource && this.props.resource.lastValidation
                ? [this.props.resource.lastValidation]
                : null
            }
            downloadSubmission={this.props.downloadSubmission}
            isAdmin={false}
          />
        </ApiResult>
      </PageContent>
    );
  }
}

TournamentSubmissionDetail.propTypes = {
  fetchResource: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  resource: PropTypes.object,
  match: PropTypes.object.isRequired,
  tournament: PropTypes.object.isRequired,
  matches: PropTypes.array,
  isFetchingMatches: PropTypes.bool.isRequired,
  fetchMatches: PropTypes.func.isRequired,
  matchesTotalItems: PropTypes.number,
  downloadSubmission: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: id => dispatch(submissionsActions.fetchResource(id)),
    downloadSubmission: id => dispatch(downloadSubmission(id)),
    fetchMatches: submissionId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            submissionId,
            state: matchStateEnum.EXECUTED,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  isFetching: submissionsSelectors.isFetchingItem,
  resource: submissionsSelectors.getItem,
  matches: matchSelectors.getItems,
  isFetchingMatches: matchSelectors.isFetching,
  matchesTotalItems: matchSelectors.getTotalItems,
  error: submissionsSelectors.getFetchItemError,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentSubmissionDetail);
