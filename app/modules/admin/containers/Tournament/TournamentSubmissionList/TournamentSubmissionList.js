import React from 'react';
import PropTypes from 'prop-types';
import {
  actions as submissionActions,
  selectors as submissionSelectors,
} from '@/modules/admin/ducks/submissions';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SubmissionList from '@/modules/shared/components/Tournament/SubmissionList';

/* eslint-disable react/prefer-stateless-function */
export class TournamentSubmissionList extends React.PureComponent {
  render() {
    return (
      <div>
        <SubmissionList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
          view="admin"
        />
      </div>
    );
  }
}

TournamentSubmissionList.propTypes = {
  tournament: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        submissionActions.fetchMany(
          prepareFilterParams(params, 'created', false, {
            tournamentId,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: submissionSelectors.getItems,
  isFetching: submissionSelectors.isFetching,
  totalItems: submissionSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentSubmissionList);
