import React from 'react';
import RecentTournamentList from '@/modules/admin/components/Dashboard/RecentTournamentList';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/admin/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { tournamentStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { Card } from 'antd';
import CardTable from '@/modules/shared/components/CardTable';

const params = {
  offset: 0,
  count: 5,
  state: [
    tournamentStateEnum.CREATED,
    tournamentStateEnum.PUBLISHED,
    tournamentStateEnum.RUNNING,
  ],
  managedOnly: true,
};

// eslint-disable-next-line react/prefer-stateless-function
class RecentTournaments extends React.Component {
  render() {
    return (
      <Card
        title={<FormattedMessage id="app.admin.dashboard.recentTournaments" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <RecentTournamentList
            fetch={this.props.fetchItems}
            dataSource={this.props.isFetching ? [] : this.props.items}
            loading={this.props.isFetching}
            size="small"
          />
        </CardTable>
      </Card>
    );
  }
}

RecentTournaments.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: () =>
      dispatch(tournamentActions.fetchMany(params, 'created', false)),
  };
}

const mapStateToProps = createStructuredSelector({
  items: tournamentSelectors.getItems,
  isFetching: tournamentSelectors.isFetching,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RecentTournaments);
