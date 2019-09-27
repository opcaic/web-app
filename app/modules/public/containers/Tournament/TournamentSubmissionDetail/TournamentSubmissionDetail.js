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
import {
  actions as validationsActions,
  selectors as validationsSelectors,
} from '@/modules/public/ducks/validations';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import PageContent from '@/modules/public/components/layout/PageContent';
import TournamentPageTitle from '@/modules/public/components/Tournament/TournamentDetail/TournamentPageTitle';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/public/utils/pageTitles';
import Submission from '@/modules/shared/components/Tournament/Submission';
import { addLastExecutions } from '@/modules/shared/helpers/resources/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { downloadSubmission } from '@/modules/shared/ducks/submission';

/* eslint-disable react/prefer-stateless-function */
class TournamentSubmissionDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(
      this.props.match.params.submissionId,
      submission => {
        if (submission.validations.length !== 0) {
          const lastValidationId =
            submission.validations[submission.validations.length - 1].id;
          this.props.fetchValidation(lastValidationId);
        }
      },
    );
  }

  render() {
    return (
      <PageContent
        title={
          <FormattedMessage id="app.public.tournamentSubmissionDetail.title" />
        }
        buttons={
          <Button type="default" size="small">
            <Link to={`/tournaments/${this.props.tournament.id}/submissions/`}>
              <FormattedMessage id="app.generic.backToList" />
            </Link>
          </Button>
        }
      >
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailSubmissionPage,
          )}
        />

        <Spin
          spinning={
            this.props.isFetching ||
            this.props.resource === null ||
            this.props.isFetchingValidations
          }
        >
          <Submission
            submission={this.props.resource}
            tournament={this.props.tournament}
            matches={addLastExecutions(this.props.matches)}
            isFetchingMatches={this.props.isFetchingMatches}
            fetchMatches={this.props.fetchMatches(
              this.props.match.params.submissionId,
            )}
            matchesTotalItems={this.props.matchesTotalItems}
            validations={
              this.props.validations ? [this.props.validations] : null
            }
            downloadSubmission={this.props.downloadSubmission}
            isAdmin={false}
          />
        </Spin>
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
  fetchValidation: PropTypes.func.isRequired,
  isFetchingValidations: PropTypes.bool.isRequired,
  validations: PropTypes.object,
  downloadSubmission: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: (id, successCallback) =>
      dispatch(
        submissionsActions.fetchResource(id, { meta: { successCallback } }),
      ),
    fetchValidation: id => dispatch(validationsActions.fetchResource(id)),
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
  isFetchingValidations: validationsSelectors.isFetching,
  validations: validationsSelectors.getItem,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentSubmissionDetail);
