import React from 'react';
import PropTypes from 'prop-types';
import { matchPropType, tournamentPropType } from '@/modules/public/propTypes';
import {
  actions as submissionActions,
  selectors as submissionSelectors,
} from '@/modules/public/ducks/submissions';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PageContent from '../../../components/Tournament/PageContent';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import SubmissionList from '@/modules/public/components/Tournament/SubmissionList';

/* eslint-disable react/prefer-stateless-function */
export class TournamentSubmissions extends React.PureComponent {
  render() {
    return (
      <PageContent title="Submissions" withPadding={false}>
        <SubmissionList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(
            this.props.tournament.id,
            this.props.currentUser.id,
          )}
          totalItems={this.props.totalItems}
        />
      </PageContent>
    );
  }
}

TournamentSubmissions.propTypes = {
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
          // TODO: how to sort this?
          prepareFilterParams(params, 'date', false, {
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

export default compose(withConnect)(TournamentSubmissions);
