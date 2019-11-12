import React from 'react';
import FailedMatchList from '@/modules/admin/components/Dashboard/FailedMatchList';
import {
  actions as matchActions,
  selectors as matchSelectors,
} from '@/modules/admin/ducks/matches';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { matchStateEnum } from '@/modules/shared/helpers/enumHelpers';
import { Card } from 'antd';
import CardTable from '@/modules/shared/components/CardTable';

class FailedMatches extends React.Component {
  fetchItems = additionalParams => {
    const params = Object.assign({}, additionalParams, {
      state: matchStateEnum.FAILED,
      managedOnly: true,
    });

    this.props.fetchItems(params);
  };

  render() {
    return (
      <Card
        title={<FormattedMessage id="app.admin.dashboard.failedMatches" />}
        bodyStyle={{ padding: 0 }}
      >
        <CardTable>
          <FailedMatchList
            fetch={this.fetchItems}
            dataSource={this.props.items}
            loading={this.props.isFetching}
            pageSize={5}
            totalItems={this.props.totalItems}
            size="small"
          />
        </CardTable>
      </Card>
    );
  }
}

FailedMatches.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  totalItems: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    fetchItems: params =>
      dispatch(matchActions.fetchMany(params, 'executed', false)),
  };
}

const mapStateToProps = createStructuredSelector({
  items: matchSelectors.getItems,
  isFetching: matchSelectors.isFetching,
  totalItems: matchSelectors.getTotalItems,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FailedMatches);
