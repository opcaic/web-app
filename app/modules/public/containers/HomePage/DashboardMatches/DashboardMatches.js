import React from 'react';
import PropTypes from 'prop-types';
import { matchPropType } from '@/modules/public/utils/propTypes';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/public/ducks/matches';
import { prepareFilterParams } from '@/modules/shared/helpers/table';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { currentUserSelector } from '@/modules/shared/selectors/auth';
import { Card } from 'antd';
import CardTable from '@/modules/public/components/Home/CardTable';
import UserMatchList from '@/modules/shared/components/Tournament/UserMatchList';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { FormattedMessage } from 'react-intl';

/* eslint-disable react/prefer-stateless-function */
export class DashboardMatches extends React.PureComponent {
  render() {
    return (
      <Card
        title={<FormattedMessage id="app.public.dashboardMatches.title" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <UserMatchList
            dataSource={this.props.items}
            loading={this.props.isFetching}
            fetch={this.props.fetchItems(this.props.currentUser.id)}
            tournament={{ format: 1, scope: 1, rankingStrategy: 1 }}
            user={this.props.currentUser}
            size="small"
            totalItems={Math.min(this.props.totalItems, 5 * 7)}
            pageSize={7}
            view="dashboard"
          />
        </CardTable>
      </Card>
    );
  }
}

DashboardMatches.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(matchPropType)),
  isFetching: PropTypes.bool.isRequired,
  fetchItems: PropTypes.func.isRequired,
  totalItems: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: userId => params =>
      dispatch(
        matchActions.fetchMany(
          prepareFilterParams(params, 'executed', false, {
            userId,
            state: matchStateEnum.EXECUTED,
          }),
        ),
      ),
  };
}

const mapStateToProps = createStructuredSelector({
  items: matchSelectors.getItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
  currentUser: currentUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardMatches);
