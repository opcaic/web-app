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
} from '../../../ducks/tournamentParticipants';
import ParticipantList from '@/modules/admin/components/Tournament/ParticipantList';
import { prepareFilterParams } from '@/modules/shared/helpers/table';

/* eslint-disable react/prefer-stateless-function */
class TournamentsParticipantList extends React.PureComponent {
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
          deleteItem={this.props.deleteItem(this.props.tournament.id)}
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
    deleteItem: tournamentId => params =>
      dispatch(
        participantsActions.deleteResource(params, {
          endpointParams: { tournamentId },
        }),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: participantsSelector.getItems,
  isFetching: participantsSelector.isFetching,
  totalItems: participantsSelector.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TournamentsParticipantList);
