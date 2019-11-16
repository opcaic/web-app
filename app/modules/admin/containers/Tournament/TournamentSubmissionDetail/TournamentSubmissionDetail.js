import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import {
  actions as submissionsActions,
  selectors as submissionsSelectors,
} from '@/modules/admin/ducks/submissions';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/admin/ducks/matches';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import Submission from '@/modules/shared/components/Tournament/Submission';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import {
  downloadSubmission,
  runValidation,
} from '@/modules/shared/ducks/submission';
import { intlGlobal } from '@/modules/shared/helpers/IntlGlobalProvider';
import { pageTitles } from '@/modules/shared/utils/pageTitles';
import TournamentPageTitle from '@/modules/shared/components/Tournament/TournamentPageTitle';

class TournamentSubmissionDetail extends React.PureComponent {
  componentDidMount() {
    this.props.fetchResource(this.props.match.params.submissionId);
  }

  render() {
    return (
      <div>
        <TournamentPageTitle
          tournament={this.props.tournament}
          title={intlGlobal.formatMessage(
            pageTitles.tournamentDetailSubmissionPage,
          )}
        />
        <Spin spinning={this.props.isFetching || this.props.resource === null}>
          <Button type="default" style={{ marginBottom: 20 }}>
            <Link
              to={`/admin/tournaments/${this.props.tournament.id}/submissions/`}
            >
              <FormattedMessage id="app.generic.backToList" />
            </Link>
          </Button>

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
              this.props.resource ? this.props.resource.validations : []
            }
            downloadSubmission={this.props.downloadSubmission}
            runValidation={this.props.runValidation}
            isAdmin
          />
        </Spin>
      </div>
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
  runValidation: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: (id, successCallback) =>
      dispatch(
        submissionsActions.fetchResource(id, {
          meta: { successCallback },
          request: { endpoint: `api/submissions/${id}/admin` },
        }),
      ),
    downloadSubmission: id => dispatch(downloadSubmission(id)),
    runValidation: (submissionId, tournamentId) =>
      dispatch(runValidation(submissionId, tournamentId)),
    fetchMatches: submissionId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            submissionId,
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
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
)(TournamentSubmissionDetail);
