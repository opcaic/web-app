import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import {
  actions as participantsActions,
  selectors as participantsSelector,
} from '@/modules/admin/ducks/tournamentParticipants';
import ParticipantList from '@/modules/admin/components/Tournament/ParticipantList';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

/* eslint-disable react/prefer-stateless-function */
class TournamentsParticipantList extends React.PureComponent {
  handleSuccess = () => {
    this.props.fetchItems(this.props.tournament.id)({ offset: 0, count: 100 });
  };

  render() {
    return (
      <div>
        <Button type="primary" style={{ marginBottom: 20 }}>
          <Link
            to={`/admin/tournaments/${
              this.props.tournament.id
            }/participants/new`}
          >
            <FormattedMessage id="app.admin.tournamentParticipantList.createNew" />
          </Link>
        </Button>

        <ParticipantList
          dataSource={this.props.items}
          loading={this.props.isFetching}
          fetch={this.props.fetchItems(this.props.tournament.id)}
          totalItems={this.props.totalItems}
          deleteItem={this.props.deleteItem(
            this.props.tournament.id,
            this.handleSuccess,
          )}
          isDeleting={this.props.isDeleting}
        />
      </div>
    );
  }
}

TournamentsParticipantList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
  tournament: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: tournamentId => params =>
      dispatch(
        participantsActions.fetchMany(
          prepareFilterParams(params, 'name', true),
          { endpointParams: { tournamentId } },
        ),
      ),
    deleteItem: (tournamentId, successCallback, failureCallback) => params =>
      dispatch(
        participantsActions.deleteResource(params, {
          endpointParams: { tournamentId },
          meta: { successCallback, failureCallback },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: participantsSelector.getItems,
  isFetching: participantsSelector.isFetching,
  isDeleting: participantsSelector.isDeleting,
  totalItems: participantsSelector.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentsParticipantList);
