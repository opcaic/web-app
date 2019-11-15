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
import { roleSelector } from '@/modules/shared/selectors/auth';
import { userRoleEnum } from '@/modules/shared/helpers/enumHelpers';

/* eslint-disable react/prefer-stateless-function */
export class TournamentSubmissionList extends React.PureComponent {
  render() {
    const additionalParams = {
      managedOnly: this.props.userRole === userRoleEnum.ORGANIZER,
    };

    return (
      <div>
        <SubmissionList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(additionalParams)(
            this.props.tournament.id,
          )}
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
  userRole: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: additionalParams => tournamentId => params =>
      dispatch(
        submissionActions.fetchMany(
          prepareFilterParams(
            Object.assign({}, additionalParams, params),
            'created',
            false,
            {
              tournamentId,
            },
          ),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: submissionSelectors.getItems,
  isFetching: submissionSelectors.isFetching,
  totalItems: submissionSelectors.getTotalItems,
  userRole: roleSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentSubmissionList);
