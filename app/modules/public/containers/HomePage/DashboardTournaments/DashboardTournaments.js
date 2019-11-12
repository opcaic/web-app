import React from 'react';
import PropTypes from 'prop-types';
import {
  actions as tournamentActions,
  selectors as tournamentSelectors,
} from '@/modules/public/ducks/tournaments';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { tournamentListItemPropType } from '@/modules/public/utils/propTypes';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { Card } from 'antd';
import CardTable from '@/modules/public/components/Home/CardTable';
import TournamentList from '@/modules/shared/components/Tournament/TournamentList';
import { FormattedMessage } from 'react-intl';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import { tournamentStateEnum } from '@/modules/shared/helpers/enumHelpers';

/* eslint-disable react/prefer-stateless-function */
export class DashboardTournaments extends React.PureComponent {
  render() {
    return (
      <Card
        title={<FormattedMessage id="app.public.dashboardTournaments.title" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <TournamentList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems(this.props.currentUser.id)}
            isAdmin={false}
            size="small"
            view="dashboard"
            totalItems={Math.min(this.props.totalItems, 5 * 5)}
            pageSize={5}
          />
        </CardTable>
      </Card>
    );
  }
}

DashboardTournaments.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(tournamentListItemPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: userId => () =>
      dispatch(
        tournamentActions.fetchMany(
          prepareFilterParams({ count: 100 }, 'deadline', true, {
            userId,
            acceptsSubmission: true,
            state: tournamentStateEnum.helpers
              .getValues()
              .map(x => x.id)
              .filter(x => x !== tournamentStateEnum.CREATED),
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: tournamentSelectors.getItems,
  isFetching: tournamentSelectors.isFetching,
  totalItems: tournamentSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardTournaments);
