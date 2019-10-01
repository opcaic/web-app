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
import { actions as validationsActions } from '@/modules/admin/ducks/validations';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spin from '@/modules/shared/components/Spin';
import Submission from '@/modules/shared/components/Tournament/Submission';
import { addLastExecutions } from '@/modules/shared/helpers/resources/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import {
  downloadSubmission,
  runValidation,
} from '@/modules/shared/ducks/submission';

/* eslint-disable react/prefer-stateless-function */
class TournamentSubmissionDetail extends React.PureComponent {
  isMounted = false;

  state = {
    validations: [],
    isFetchingValidations: true,
  };

  componentDidMount() {
    this.isMounted = true;
    const validations = {};

    // Fetch submissions and then fetch all submission validation details
    this.props.fetchResource(
      this.props.match.params.submissionId,
      submission => {
        submission.validations.forEach(x => {
          this.props.fetchValidation(x.id, validation => {
            validations[validation.id] = validation;

            // If we have all submission validations, save them to state
            if (
              this.isMounted &&
              submission.validations.length === Object.keys(validations).length
            ) {
              this.setState({
                isFetchingValidations: false,
                validations: submission.validations.map(y => validations[y.id]),
              });
            }
          });
        });
      },
    );
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  render() {
    return (
      <div>
        <Spin
          spinning={
            this.props.isFetching ||
            this.props.resource === null ||
            this.state.isFetchingValidations
          }
        >
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
            matches={addLastExecutions(this.props.matches)}
            isFetchingMatches={this.props.isFetchingMatches}
            fetchMatches={this.props.fetchMatches(
              this.props.match.params.submissionId,
            )}
            matchesTotalItems={this.props.matchesTotalItems}
            validations={this.state.validations}
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
  fetchValidation: PropTypes.func.isRequired,
  downloadSubmission: PropTypes.func.isRequired,
  runValidation: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchResource: (id, successCallback) =>
      dispatch(
        submissionsActions.fetchResource(id, { meta: { successCallback } }),
      ),
    fetchValidation: (id, successCallback) =>
      dispatch(
        validationsActions.fetchResource(id, { meta: { successCallback } }),
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
